import type { Document } from '~/types'

const documents: Document[] = [
  {
    type: 'documents',
    name: 'bachelor-thesis',
    date: '2021-02-10',
    language: 'german',
  },
  {
    type: 'documents',
    name: 'koffee',
    date: '2020-10-21',
    language: 'german',
  },
  {
    type: 'documents',
    name: 'threadsafe-data-structures',
    date: '2020-02-12',
    language: 'german',
  },
]

export function useDocuments(): Document[] {
  return documents
}
