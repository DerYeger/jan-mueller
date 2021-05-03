import { IContentDocument } from '@nuxt/content/types/content'

export interface Content extends IContentDocument {
  title: string
  description: string
}
