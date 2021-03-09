import DateTimeFormatOptions = Intl.DateTimeFormatOptions

export function formatDate(date: Date): string {
  const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en', options)
}
