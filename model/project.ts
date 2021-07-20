import { Content } from '~/model/content'

export interface Project extends Content {
  repository?: string
  repositories?: string[]
  demo?: string
  thumbnail?: string
}
