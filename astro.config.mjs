import image from '@astrojs/image'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://jan-mueller.at',
  server: {
    host: true,
  },
  integrations: [
    image(),
    mdx(),
    sitemap(),
    react(),
    tailwind({ config: { applyBaseStyles: false } }),
    vue(),
    robotsTxt(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'monokai',
    },
  },
})
