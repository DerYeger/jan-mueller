import { IContentDocument } from '@nuxt/content/types/content'

export interface Project extends IContentDocument {
  repository?: string
  demo?: string
}
