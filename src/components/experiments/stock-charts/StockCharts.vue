<script setup lang="ts">
import { ref, computed } from 'vue'
import StockChartsUploader from './StockChartsUploader.vue'
import StockChartsSettings from './StockChartsSettings.vue'
import StockChartsChart from './StockChartsChart.vue'
import {
  parseCSV,
  parseXlsx,
  validateSortedDates,
  fillGaps,
  toRelativeChanges,
  calculateChartData,
  getDefaultColor,
  skipEmptyRows,
  type ParsedData,
  type ChartData,
  type SeriesConfig,
  type AxisOverrides,
  type ChartSettings,
} from './stockChartsData'

const rawData = ref<ParsedData | null>(null)
const errors = ref<string[]>([])
const seriesConfigs = ref<SeriesConfig[]>([])
const axisOverrides = ref<AxisOverrides>({})
const chartSettings = ref<ChartSettings>({
  showRelativeChanges: false,
  showLegend: false,
  showXAxis: true,
  showYAxis: true,
  showGridLines: false,
  skipEmptyRows: false,
})
const chartRef = ref<InstanceType<typeof StockChartsChart> | null>(null)

const filledData = computed(() => {
  if (!rawData.value) return null
  return fillGaps(rawData.value)
})

const processedData = computed(() => {
  if (!filledData.value) return null

  let data = filledData.value
  if (chartSettings.value.skipEmptyRows) {
    data = skipEmptyRows(data)
  }

  if (chartSettings.value.showRelativeChanges) {
    return toRelativeChanges(data)
  }

  return data
})

const chartData = computed<ChartData | null>(() => {
  if (!processedData.value) return null
  return calculateChartData(processedData.value, axisOverrides.value)
})

type UploadPayload =
  | { kind: 'csv'; content: string }
  | { kind: 'xlsx'; data: ArrayBuffer; fileName: string }

function handleUpload(payload: UploadPayload) {
  errors.value = []

  const result = payload.kind === 'csv' ? parseCSV(payload.content) : parseXlsx(payload.data)

  if (result.errors.length > 0) {
    errors.value = result.errors
  }

  if (result.data.dates.length === 0) {
    errors.value.push('No valid data found in file')
    return
  }

  const validation = validateSortedDates(result.data.dates)
  if (!validation.valid && validation.error) {
    errors.value.push(validation.error)
    return
  }

  rawData.value = result.data

  // Initialize series configs
  seriesConfigs.value = result.data.series.map((series, index) => ({
    name: series.name,
    color: getDefaultColor(index),
    smooth: false,
    visible: true,
    showPoints: false,
  }))

  // Reset settings
  axisOverrides.value = {}
  chartSettings.value = {
    showRelativeChanges: false,
    showLegend: false,
    showXAxis: true,
    showYAxis: true,
    showGridLines: false,
    skipEmptyRows: false,
  }
}

function handleReset() {
  if (!rawData.value) return

  seriesConfigs.value = rawData.value.series.map((series, index) => ({
    name: series.name,
    color: getDefaultColor(index),
    smooth: false,
    visible: true,
    showPoints: false,
  }))

  axisOverrides.value = {}
  chartSettings.value = {
    showRelativeChanges: false,
    showLegend: false,
    showXAxis: true,
    showYAxis: true,
    showGridLines: false,
    skipEmptyRows: false,
  }
}

function clearData() {
  rawData.value = null
  errors.value = []
  seriesConfigs.value = []
  axisOverrides.value = {}
  chartSettings.value = {
    showRelativeChanges: false,
    showLegend: false,
    showXAxis: true,
    showYAxis: true,
    showGridLines: false,
    skipEmptyRows: false,
  }
}

function dataUrlToBlob(dataUrl: string): Blob | null {
  const [header, data] = dataUrl.split(',')
  if (!header || !data) return null

  const base64Match = header.match(/;base64$/)
  const mimeMatch = header.match(/data:(.*?)(;base64)?$/)
  const mimeType = mimeMatch?.[1] || 'image/svg+xml'

  if (base64Match) {
    const binary = atob(data)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return new Blob([bytes], { type: mimeType })
  }

  const decoded = decodeURIComponent(data)
  return new Blob([decoded], { type: mimeType })
}

function handleExportSvg() {
  const dataUrl = chartRef.value?.exportSvg?.()
  if (!dataUrl) return

  const timestamp = new Date().toISOString().slice(0, 10)
  const blob = dataUrlToBlob(dataUrl)
  const downloadUrl = blob ? URL.createObjectURL(blob) : dataUrl

  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = `stock-chart-${timestamp}.svg`
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()

  if (blob) {
    URL.revokeObjectURL(downloadUrl)
  }
}
</script>

<template>
  <div
    class="flex size-full flex-col overflow-y-auto bg-body text-medium md:flex-row md:overflow-hidden"
  >
    <!-- Sidebar -->
    <div
      class="flex w-full min-w-0 flex-col border-b border-medium bg-base md:w-72 md:border-b-0 md:border-r"
    >
      <div class="stock-charts-sidebar p-4 grow flex flex-col gap-4 overflow-y-auto">
        <!-- Data section -->
        <div class="flex flex-col gap-2">
          <h3 class="m-0 text-xs font-medium uppercase tracking-wide text-lighter">Data</h3>
          <template v-if="rawData">
            <div
              class="flex items-center gap-4 rounded-lg border border-medium bg-neutral-100/80 px-4 py-2 dark:bg-neutral-900/70"
            >
              <span class="text-sm text-light">{{ rawData.dates.length }} rows</span>
              <span class="text-sm text-light">{{ rawData.series.length }} series</span>
              <button
                class="focus-visible:focus-ring ml-auto cursor-pointer rounded border border-red-400 bg-transparent px-2 py-1 text-xs text-red-600 transition-all hocus:border-red-500 hocus:bg-red-500 hocus:text-white dark:border-red-500 dark:text-red-400"
                @click="clearData"
              >
                Clear
              </button>
            </div>
          </template>
          <StockChartsUploader v-else @upload="handleUpload" />
        </div>

        <!-- Errors -->
        <div v-if="errors.length > 0" class="flex flex-col gap-1">
          <div
            v-for="(error, index) in errors"
            :key="index"
            class="rounded border border-red-300 bg-red-50 p-2 text-xs text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300"
          >
            {{ error }}
          </div>
        </div>

        <!-- Settings -->
        <StockChartsSettings
          :series-configs="seriesConfigs"
          :axis-overrides="axisOverrides"
          :chart-data="chartData"
          :chart-settings="chartSettings"
          @update:series-configs="seriesConfigs = $event"
          @update:axis-overrides="axisOverrides = $event"
          @update:chart-settings="chartSettings = $event"
          @reset="handleReset"
          @export="handleExportSvg"
        />
      </div>
    </div>

    <!-- Chart area -->
    <div class="flex min-h-90 min-w-0 flex-1 items-center justify-center p-4 md:min-h-0">
      <template v-if="chartData">
        <StockChartsChart
          ref="chartRef"
          :chart-data="chartData"
          :series-configs="seriesConfigs"
          :chart-settings="chartSettings"
        />
      </template>
      <div v-else class="flex flex-col items-center gap-2 text-center text-light">
        <p class="m-0">Upload a CSV or XLSX file to visualize data</p>
        <p class="m-0 max-w-xs text-sm text-lighter">
          Expected format: first column contains dates, subsequent columns contain numeric values
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stock-charts-sidebar {
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 16px,
    black calc(100% - 16px),
    transparent
  );
}
</style>
