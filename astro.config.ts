import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import vitePreact from '@preact/preset-vite'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import autolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import { tsconfigPaths } from 'vite-plugin-lib'

import { autolinkConfig } from './plugins/rehype-autolink-config'
import { remarkReadingTime } from './plugins/remark-reading-time.js'

// https://astro.build/config
export default defineConfig({
  site: 'https://jan-mueller.at',
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
    }),
    mdx({
        extendMarkdownConfig: true,
      }),
    tailwind({
        applyBaseStyles: false,
      }),
    vue(),
    preact({
        compat: true,
      }),
    prefetch(),
    sitemap(),
    robotsTxt(),
  ],
  vite: {
    plugins: [vitePreact(), tsconfigPaths({ verbose: true })],
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
