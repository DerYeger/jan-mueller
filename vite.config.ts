/// <reference types="vitest" />
import { readFileSync } from 'fs'
import { resolve } from 'path'

import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import LinkAttributes from 'markdown-it-link-attributes'
import Prism from 'markdown-it-prism'
import { presetUno, presetWebFonts } from 'unocss'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import SSGUtils from 'vite-plugin-ssg-utils'
import Layouts from 'vite-plugin-vue-layouts'

import { useDocuments } from './src/composables/documents'
import { useModels } from './src/composables/models'

const markdownWrapperClasses = 'prose children:text-start'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    SSGUtils(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        const md = readFileSync(path, 'utf-8')
        const { data } = matter(md)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        return route
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        'vitest',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          componentPrefix: '',
          enabledCollections: ['carbon', 'logos', 'vscode-icons'],
        }),
      ],

      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      defaultStyle: 'display: inline-block; vertical-align: middle;',
    }),

    Unocss({
      presets: [
        presetUno({
          dark: 'class',
        }),
        presetWebFonts({
          fonts: {
            // these will extend the default theme
            sans: 'Montserrat:400,500,700',
          },
        }),
      ],
      shortcuts: [
        ['text-primary', 'text-black dark:text-white'],
        ['text-light', 'op95 dark:op85'],
        ['text-lighter', 'op70 dark:op60 fw400'],
        [
          'btn-base',
          'px-2 py-1 rounded inline-flex justify-center gap-2 leading-30px children:mya !no-underline cursor-pointer text-black dark:text-white opacity-50 hover:opacity-80',
        ],
        ['icon-btn', 'btn-base'],
        ['prose', 'text-light fw400 lh-7'],
        ['flex-center', 'flex items-center'],
        [
          'card',
          'pa-4 border-solid border-2 border-$primary text-light hover:shadow-xl rounded-xl flex flex-col gap-4 text-primary op80 hover:op100',
        ],
        ['subheading', 'mt-0 mb-2'],
      ],
    }),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Jan Müller',
        short_name: 'Jan Müller',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      const staticPaths = paths.filter((path) => !path.includes(':'))
      const dynamicPaths = [...useDocuments(), ...useModels()].map(
        (file) => `/files/${file.type}/${file.name}`
      )
      return [...staticPaths, ...dynamicPaths, '/404']
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    exclude: ['vue-demi'],
  },

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
})
