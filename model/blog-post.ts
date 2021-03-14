import { IContentDocument } from '@nuxt/content/types/content'

export interface BlogPost extends IContentDocument {
  tags?: string[]
  image?: string
}

export function hasTags(post: BlogPost): boolean {
  return (post.tags?.length ?? 0) > 0
}
