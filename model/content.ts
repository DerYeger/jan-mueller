import { IContentDocument } from '@nuxt/content/types/content'

export interface TableOfContentsEntry {
  id: string
  text: string
}

export interface Content extends IContentDocument {
  title: string
  description: string
  toc?: TableOfContentsEntry[]
}
