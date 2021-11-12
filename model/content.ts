// eslint-disable-next-line import/named
import { FetchReturn } from '@nuxt/content/types/query-builder'

export interface TableOfContentsEntry {
  id: string
  depth: number
  text: string
}

export interface Content extends FetchReturn {
  title: string
  description: string
  toc?: TableOfContentsEntry[]
}
