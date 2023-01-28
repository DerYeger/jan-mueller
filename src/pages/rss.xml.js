import rss from '@astrojs/rss'
// eslint-disable-next-line import/no-unresolved
import { getCollection } from 'astro:content'

export async function get(context) {
  const blog = await getCollection('blog')
  return rss({
    title: `Jan's Blog`,
    description: `Jan's personal blog is all about Software Engineering.`,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/pretty-feed-v3.xsl',
  })
}
