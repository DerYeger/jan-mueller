import { Document } from '~/types'

const documents: Document[] = [
  {
    name: 'bachelor-thesis',
    date: '2021-02-10',
    language: 'german',
    path: 'bachelor-thesis.pdf',
  },
  {
    name: 'koffee',
    date: '2020-10-21',
    language: 'german',
    path: 'koffee.pdf',
  },
  {
    name: 'threadsafe-data-structures',
    date: '2020-02-12',
    language: 'german',
    path: 'threadsafe-data-structures.pdf',
  },
]

export function useDocuments(): Document[] {
  return documents
}
