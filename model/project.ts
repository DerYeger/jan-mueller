import { Content } from '~/model/content'

export interface Project extends Content {
  repository?: string
  demo?: string
  thumbnail?: string
}
