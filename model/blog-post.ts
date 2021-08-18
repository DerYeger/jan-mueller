import { Content } from '~/model/content'

export interface BlogPost extends Content {
  readingTime: string
  tags?: string[]
  image?: string
  imageAlt?: string
}

export function hasTags(post: BlogPost): boolean {
  return (post.tags?.length ?? 0) > 0
}
