import { defineCollection, z } from 'astro:content'
import moment from 'moment'

const DateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return moment(arg).toDate()
  }
}, z.date())

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    pubDate: DateSchema,
    updatedDate: DateSchema.optional(),
  }),
})

export const collections = { blog }
