import { Content } from '~/model/content'

export interface Project extends Content {
  account?: string
  repository?: string
  repositories?: string[]
  demo?: string
  thumbnail?: string
}
