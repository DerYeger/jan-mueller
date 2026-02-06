import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export interface ParsedData {
  dates: Date[]
  series: { name: string; values: (number | null)[] }[]
}

export interface ChartData {
  dates: Date[]
  series: { name: string; values: (number | null)[] }[]
  xMin: Date
  xMax: Date
  yMin: number
  yMax: number
}

export interface SeriesConfig {
  name: string
  color: string
  smooth: boolean
  visible: boolean
  showPoints: boolean
}

export interface ChartSettings {
  showRelativeChanges: boolean
  showLegend: boolean
  showXAxis: boolean
  showYAxis: boolean
  showGridLines: boolean
  skipEmptyRows: boolean
}

export interface AxisOverrides {
  xMin?: Date
  xMax?: Date
  yMin?: number
  yMax?: number
}

const DEFAULT_COLORS = [
  '#ef4444', // red
  '#3b82f6', // blue
  '#22c55e', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
]

export function getDefaultColor(index: number): string {
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

/**
 * Parse a date string with multiple format heuristics
 */
export function parseDate(value: string): Date | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  // Try ISO format first (YYYY-MM-DD, YYYY/MM/DD)
  const isoMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/)
  if (isoMatch) {
    const [, year, month, day] = isoMatch
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    if (!isNaN(date.getTime())) return date
  }

  // Try US format (MM/DD/YYYY, MM-DD-YYYY)
  const usMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/)
  if (usMatch) {
    const [, month, day, year] = usMatch
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    if (!isNaN(date.getTime())) return date
  }

  // Try European format (DD.MM.YYYY or DD/MM/YYYY)
  const euMatch = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})/)
  if (euMatch) {
    const [, day, month, year] = euMatch
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    if (!isNaN(date.getTime())) return date
  }

  // Try native Date parsing as fallback
  const nativeDate = new Date(trimmed)
  if (!isNaN(nativeDate.getTime())) return nativeDate

  return null
}

/**
 * Parse a numeric value, handling various formats
 */
export function parseNumeric(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '-' || trimmed === '') return null

  // Remove thousand separators and handle decimal commas
  let normalized = trimmed.replace(/\s/g, '')

  // Detect European format (comma as decimal separator)
  if (normalized.includes(',') && !normalized.includes('.')) {
    normalized = normalized.replace(',', '.')
  } else if (normalized.includes(',') && normalized.includes('.')) {
    // Has both: assume comma is thousand separator
    normalized = normalized.replace(/,/g, '')
  }

  const num = Number(normalized)
  return isNaN(num) ? null : num
}

function emptyParsedData(): ParsedData {
  return { dates: [], series: [] }
}

function toCellString(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function parseRows(rows: unknown[][], sourceLabel: string): { data: ParsedData; errors: string[] } {
  const errors: string[] = []

  if (rows.length < 2) {
    errors.push(`${sourceLabel} must have at least a header row and one data row`)
    return { data: emptyParsedData(), errors }
  }

  const header = rows[0].map(toCellString)
  if (header.length < 2) {
    errors.push(`${sourceLabel} must have at least two columns (date and one value)`)
    return { data: emptyParsedData(), errors }
  }

  const seriesNames = header.slice(1)
  const dates: Date[] = []
  const seriesValues: (number | null)[][] = seriesNames.map(() => [])

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] ?? []
    const dateStr = toCellString(row[0])
    const date = parseDate(dateStr)

    if (!date) {
      errors.push(`Row ${i + 1}: Invalid date "${dateStr}"`)
      continue
    }

    dates.push(date)

    for (let j = 0; j < seriesNames.length; j++) {
      const value = toCellString(row[j + 1])
      seriesValues[j].push(parseNumeric(value))
    }
  }

  const series = seriesNames.map((name, i) => ({
    name: name || `Series ${i + 1}`,
    values: seriesValues[i],
  }))

  return {
    data: { dates, series },
    errors,
  }
}

/**
 * Parse CSV content into structured data
 */
export function parseCSV(content: string): { data: ParsedData; errors: string[] } {
  const result = Papa.parse<string[]>(content, {
    skipEmptyLines: true,
  })

  const errors: string[] = []

  if (result.errors.length > 0) {
    errors.push(...result.errors.map((e) => `Row ${e.row}: ${e.message}`))
  }

  const parsed = parseRows(result.data, 'CSV')
  return { data: parsed.data, errors: [...errors, ...parsed.errors] }
}

/**
 * Parse XLSX content into structured data (first sheet)
 */
export function parseXlsx(data: ArrayBuffer): { data: ParsedData; errors: string[] } {
  const errors: string[] = []
  let workbook: XLSX.WorkBook

  try {
    workbook = XLSX.read(data, { type: 'array', cellDates: true })
  } catch {
    return { data: emptyParsedData(), errors: ['Failed to read XLSX file'] }
  }

  const sheetName = workbook.SheetNames[0]
  if (!sheetName) {
    errors.push('XLSX must contain at least one sheet')
    return { data: emptyParsedData(), errors }
  }

  const sheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true }) as unknown[][]
  return parseRows(rows, 'XLSX')
}

/**
 * Validate that dates are sorted in ascending order
 */
export function validateSortedDates(dates: Date[]): { valid: boolean; error?: string } {
  for (let i = 1; i < dates.length; i++) {
    if (dates[i].getTime() <= dates[i - 1].getTime()) {
      return {
        valid: false,
        error: `Dates must be sorted in ascending order. Row ${i + 2} (${dates[i].toLocaleDateString()}) is not after row ${i + 1} (${dates[i - 1].toLocaleDateString()})`,
      }
    }
  }
  return { valid: true }
}

/**
 * Infer the smallest interval between dates (in milliseconds)
 */
export function inferInterval(dates: Date[]): number {
  if (dates.length < 2) return 24 * 60 * 60 * 1000 // Default to 1 day

  let minInterval = Infinity
  for (let i = 1; i < dates.length; i++) {
    const interval = dates[i].getTime() - dates[i - 1].getTime()
    if (interval > 0 && interval < minInterval) {
      minInterval = interval
    }
  }

  return minInterval === Infinity ? 24 * 60 * 60 * 1000 : minInterval
}

/**
 * Fill gaps in the date series for even spacing
 */
export function fillGaps(data: ParsedData): ParsedData {
  if (data.dates.length < 2) return data

  const interval = inferInterval(data.dates)
  const filledDates: Date[] = []
  const filledSeries: (number | null)[][] = data.series.map(() => [])

  let currentDate = data.dates[0]
  const endDate = data.dates[data.dates.length - 1]
  let sourceIndex = 0

  while (currentDate.getTime() <= endDate.getTime()) {
    filledDates.push(new Date(currentDate))

    // Check if this date exists in original data
    if (
      sourceIndex < data.dates.length &&
      Math.abs(data.dates[sourceIndex].getTime() - currentDate.getTime()) < interval / 2
    ) {
      // Use original values
      for (let i = 0; i < data.series.length; i++) {
        filledSeries[i].push(data.series[i].values[sourceIndex])
      }
      sourceIndex++
    } else {
      // Insert nulls for missing dates
      for (let i = 0; i < data.series.length; i++) {
        filledSeries[i].push(null)
      }
    }

    currentDate = new Date(currentDate.getTime() + interval)
  }

  return {
    dates: filledDates,
    series: data.series.map((s, i) => ({
      name: s.name,
      values: filledSeries[i],
    })),
  }
}

/**
 * Remove rows where any series value is empty
 */
export function skipEmptyRows(data: ParsedData): ParsedData {
  if (data.dates.length === 0 || data.series.length === 0) return data

  const keptIndexes: number[] = []

  for (let i = 0; i < data.dates.length; i++) {
    const hasEmpty = data.series.some((series) => series.values[i] == null)
    if (!hasEmpty) keptIndexes.push(i)
  }

  return {
    dates: keptIndexes.map((index) => data.dates[index]),
    series: data.series.map((series) => ({
      name: series.name,
      values: keptIndexes.map((index) => series.values[index]),
    })),
  }
}

/**
 * Convert absolute values to relative percentage changes from the first value
 * Supports negative values when the value drops below the initial value
 */
export function toRelativeChanges(data: ParsedData): ParsedData {
  return {
    dates: data.dates,
    series: data.series.map((series) => {
      // Find the first non-null value as the baseline
      const firstValue = series.values.find((v) => v !== null)
      if (firstValue === null || firstValue === undefined || firstValue === 0) {
        // Can't compute relative changes without a valid first value
        return { name: series.name, values: series.values.map(() => null) }
      }

      const relativeValues = series.values.map((value) => {
        if (value === null) return null
        // Calculate percentage change: ((current - initial) / initial) * 100
        return ((value - firstValue) / Math.abs(firstValue)) * 100
      })

      return {
        name: series.name,
        values: relativeValues,
      }
    }),
  }
}

/**
 * Calculate axis ranges with optional overrides
 */
export function calculateChartData(data: ParsedData, overrides: AxisOverrides = {}): ChartData {
  const allValues = data.series.flatMap((s) => s.values).filter((v): v is number => v !== null)

  const dataYMin = allValues.length > 0 ? Math.min(...allValues) : 0
  const dataYMax = allValues.length > 0 ? Math.max(...allValues) : 100
  const yPadding = (dataYMax - dataYMin) * 0.05 || 1

  return {
    dates: data.dates,
    series: data.series,
    xMin: overrides.xMin ?? data.dates[0] ?? new Date(),
    xMax: overrides.xMax ?? data.dates[data.dates.length - 1] ?? new Date(),
    yMin: overrides.yMin ?? dataYMin - yPadding,
    yMax: overrides.yMax ?? dataYMax + yPadding,
  }
}

/**
 * Map a date to x coordinate (0-100)
 */
export function mapDateToX(date: Date, xMin: Date, xMax: Date): number {
  const range = xMax.getTime() - xMin.getTime()
  if (range === 0) return 50
  return ((date.getTime() - xMin.getTime()) / range) * 100
}

/**
 * Map a value to y coordinate (0-100, inverted for SVG)
 */
export function mapValueToY(value: number, yMin: number, yMax: number): number {
  const range = yMax - yMin
  if (range === 0) return 50
  return 100 - ((value - yMin) / range) * 100
}

/**
 * Generate SVG path for a series (hard lines)
 * Skips null values and connects previous to next point
 */
export function generateLinePath(
  dates: Date[],
  values: (number | null)[],
  xMin: Date,
  xMax: Date,
  yMin: number,
  yMax: number,
): string {
  // Filter out null values, keeping only valid points
  const points: { x: number; y: number }[] = []

  for (let i = 0; i < dates.length; i++) {
    const value = values[i]
    if (value === null) continue

    const x = mapDateToX(dates[i], xMin, xMax)
    const y = mapValueToY(value, yMin, yMax)
    points.push({ x, y })
  }

  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')
}

/**
 * Generate smooth SVG path using Catmull-Rom to Bezier conversion
 * Skips null values and connects previous to next point
 */
export function generateSmoothPath(
  dates: Date[],
  values: (number | null)[],
  xMin: Date,
  xMax: Date,
  yMin: number,
  yMax: number,
): string {
  // Collect all non-null points into a single continuous path
  const points: { x: number; y: number }[] = []

  for (let i = 0; i < dates.length; i++) {
    const value = values[i]
    if (value === null) continue

    const x = mapDateToX(dates[i], xMin, xMax)
    const y = mapValueToY(value, yMin, yMax)
    points.push({ x, y })
  }

  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }

  // Catmull-Rom to Bezier conversion
  let path = `M ${points[0].x} ${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    const tension = 0.5

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }

  return path
}

/**
 * Format date for display on x-axis
 */
export function formatDateLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/**
 * Format number for display on y-axis
 */
export function formatValueLabel(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M'
  }
  if (Math.abs(value) >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K'
  }
  if (Number.isInteger(value)) {
    return value.toString()
  }
  return value.toFixed(2)
}

/**
 * Generate nice tick values for an axis
 */
export function generateTicks(min: number, max: number, count: number = 5): number[] {
  const range = max - min
  if (range === 0) return [min]

  const rawStep = range / (count - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const normalized = rawStep / magnitude

  let niceStep: number
  if (normalized <= 1) niceStep = 1 * magnitude
  else if (normalized <= 2) niceStep = 2 * magnitude
  else if (normalized <= 5) niceStep = 5 * magnitude
  else niceStep = 10 * magnitude

  const niceMin = Math.floor(min / niceStep) * niceStep
  const ticks: number[] = []

  for (let tick = niceMin; tick <= max + niceStep * 0.5; tick += niceStep) {
    if (tick >= min - niceStep * 0.5) {
      ticks.push(tick)
    }
  }

  return ticks
}

/**
 * Generate date ticks for x-axis
 */
export function generateDateTicks(min: Date, max: Date, count: number = 5): Date[] {
  const range = max.getTime() - min.getTime()
  if (range === 0) return [min]

  const step = range / (count - 1)
  const ticks: Date[] = []

  for (let i = 0; i < count; i++) {
    ticks.push(new Date(min.getTime() + step * i))
  }

  return ticks
}
