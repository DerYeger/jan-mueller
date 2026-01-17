// src/pages/open-graph/[...route].ts

import { OGImageRoute } from 'astro-og-canvas'
import { getCollection } from 'astro:content'
import Package from '../../../package.json'

const collectionEntries = await getCollection('blog')

interface PageInfo {
  title: string
  description?: string
}

const pages: Record<string, PageInfo> = Object.fromEntries(
  collectionEntries.map(({ slug, data }) => [slug, data]),
)

pages.default = {
  title: 'Jan Müller',
  description: Package.description,
}

pages.blog = {
  title: `Jan's Blog`,
  description: Package.description,
}

const LOGO_WIDTH = 192

const FONT_BASE_CONFIG = {
  families: ['Inter'],
  color: [10, 10, 10] as [number, number, number],
  lineHeight: 1.2,
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: './src/assets/avatar.png',
      size: [LOGO_WIDTH, LOGO_WIDTH / 0.9613919228],
    },
    padding: 32,
    bgGradient: [[256, 256, 256]],
    font: {
      title: {
        ...FONT_BASE_CONFIG,
        size: 64,
        weight: 'Bold',
      },
      description: {
        ...FONT_BASE_CONFIG,
        size: 48,
        weight: 'Medium',
      },
    },
    fonts: ['./public/static/fonts/Inter-Regular.woff2'],
  }),
})
