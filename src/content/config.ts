import { defineCollection, z } from 'astro:content'

const DateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return new Date(arg)
  }
}, z.date())

const BlogPostSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().startsWith('/assets/blog/'),
    pubDate: DateSchema,
    updatedDate: DateSchema.optional(),
    layout: z.literal('@layouts/BlogPostLayout.astro'),
  })
  .strict()
export type BlogPost = z.infer<typeof BlogPostSchema>

const blog = defineCollection({
  schema: BlogPostSchema,
})

export const collections = { blog }
