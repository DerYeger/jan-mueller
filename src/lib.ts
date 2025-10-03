import { formatDate as formatDateBase, formatDuration as formatDurationBase, intervalToDuration } from 'date-fns'
import type { Duration } from 'date-fns'

export async function getImageAsset(imagePath: string): Promise<ImageMetadata | undefined> {
  const assets = import.meta.glob('~/assets/**/*')
  const asset = Object.entries(assets).find(([fileName]) =>
    fileName.endsWith(imagePath),
  )
  if (!asset) {
    return undefined
  }
  const imageImport = await asset[1]() as { default: ImageMetadata }
  return imageImport.default
}

export const accounts = [
  {
    name: 'GitHub',
    icon: 'akar-icons:github-fill',
    href: 'https://github.com/DerYeger',
  },
  {
    name: 'LinkedIn',
    icon: 'akar-icons:linkedin-fill',
    href: 'https://www.linkedin.com/in/jan-patrick-mueller/',
  },
  {
    name: 'XING',
    icon: 'carbon:logo-xing',
    href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
  },
  {
    name: 'Twitter',
    icon: 'fa-brands:twitter',
    href: 'https://twitter.com/DerYeger',
  },
]

export const DateFormats = {
  Day: 'MMM dd, yyyy',
  Month: 'MMM yyyy',
}

export type DateLike = string | Date

export function formatDate(date: DateLike, format: string): string {
  return formatDateBase(date, format)
}

export interface TimeRange { from: DateLike, to: DateLike }

export function getDuration(ranges: TimeRange[]): Duration {
  return ranges
    .map((r) => intervalToDuration({ start: r.from, end: r.to }))
    .map(normalizeDuration)
  .reduce((acc, curr) => {
    return {
      years: (acc.years ?? 0) + (curr.years ?? 0),
      months: (acc.months ?? 0) + (curr.months ?? 0),
      days: (acc.days ?? 0) + (curr.days ?? 0),
      hours: (acc.hours ?? 0) + (curr.hours ?? 0),
      minutes: (acc.minutes ?? 0) + (curr.minutes ?? 0),
      seconds: (acc.seconds ?? 0) + (curr.seconds ?? 0),
    }
  }, {})
}

function normalizeDuration(duration: Duration): Duration {
  if (duration.days && duration.days > 14) {
    duration.months = (duration.months ?? 0) + 1
    duration.days = 0
  }

  if (!duration.years && !duration.months) {
    duration.months = 1
    duration.days = 0
  }

  if (duration.months && duration.months > 12) {
    duration.years = (duration.years ?? 0) + Math.floor((duration.months ?? 0) / 12)
    duration.months = (duration.months ?? 0) % 12
  }

  return duration
}

export function formatDuration(duration: Duration) {
  const normalized = normalizeDuration(duration)
  return formatDurationBase(normalized, { format: ['years', 'months'] })
}

const today = new Date()

export function getToday() {
  return new Date(today)
}
