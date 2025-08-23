import { expect, test } from '@playwright/test'

interface BlogPostData {
  slug: string
  title: string
}

const BLOG_POSTS: BlogPostData[] = [
  {
    slug: 'next-level-heading-anchors',
    title: 'Next-level Heading Anchors with Astro and rehype',
  },
  {
    slug: 'react-leaflet',
    title: 'React, Leaflet, and SSR',
  },
  {
    slug: 'vue-composable-testing',
    title: 'Testing advanced Vue composables',
  },
  {
    slug: 'vue-marmoset-viewer',
    title: 'Displaying 3D models with Vue',
  },
  {
    slug: 'vue-masonry-wall',
    title: 'Masonry layout for Vue 2 and Vue 3',
  },
  {
    slug: 'web-components',
    title: 'Working wonders with web workers',
  },
]

test.describe('Posts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/vue-masonry-wall')
  })

  BLOG_POSTS.forEach((post) => {
    test(`shows the blog ${post.slug} post`, async ({ page }) => {
      await page.goto(`/blog/${post.slug}`)
      const postTitle = page.getByRole('heading', { name: post.title })
      await expect(postTitle).toHaveText(post.title)
    })
  })
})
