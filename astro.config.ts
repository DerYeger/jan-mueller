import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import autolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import { comlink } from 'vite-plugin-comlink'
import { tsconfigPaths } from 'vite-plugin-lib'
import tailwindcss from '@tailwindcss/vite'

import { autolinkConfig } from './plugins/rehype-autolink-config'
import { remarkReadingTime } from './plugins/remark-reading-time.js'

// https://astro.build/config
export default defineConfig({
  site: 'https://janmueller.dev',
  server: {
    host: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    icon(),
    expressiveCode({
      themes: ['gruvbox-dark-medium'],
      styleOverrides: {
        frames: {
          // matches shadow-md
          frameBoxShadowCssValue:
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px',
        },
      },
    }),
    mdx({
      extendMarkdownConfig: true,
    }),
    vue(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/external/'),
    }),
    robotsTxt(),
  ],
  vite: {
    plugins: [comlink(), tailwindcss(), tsconfigPaths({ verbose: true })],
    worker: {
      plugins: () => [comlink()],
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    gfm: true,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [autolinkHeadings, autolinkConfig],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: 'noreferrer',
        },
      ],
    ],
  },
})
