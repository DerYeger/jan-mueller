import { Document } from '~/types'

const documents: Document[] = [
  {
    name: 'bachelor-thesis',
    date: '2021-02-10',
    language: 'german',
  },
  {
    name: 'koffee',
    date: '2020-10-21',
    language: 'german',
  },
  {
    name: 'threadsafe-data-structures',
    date: '2020-02-12',
    language: 'german',
  },
]

export function useDocuments(): Document[] {
  return documents
}
