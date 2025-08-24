import { defineCollection, z } from 'astro:content'
import moment from 'moment'

const DateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return moment(arg).toDate()
  }
}, z.date())

const BlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  heroImage: z.string().startsWith('/assets/blog/'),
  pubDate: DateSchema,
  updatedDate: DateSchema.optional(),
  layout: z.literal('~/layouts/MarkdownLayout.astro'),
}).strict()
export type BlogPost = z.infer<typeof BlogPostSchema>

const blog = defineCollection({
  schema: BlogPostSchema,
})

export const collections = { blog }
