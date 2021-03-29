import de from './de.json'
import en from './en.json'

const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
  de: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
}

export default {
  locale: 'en',
  fallbackLocale: 'en',
  messages: { de, en },
  dateTimeFormats,
}
