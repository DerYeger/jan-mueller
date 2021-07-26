import { Language } from '~/model/language'

export interface Document {
  file: string
  language: Language
  date: Date
}
