import i18n from './locales/i18n'
import { primaryColor, themes } from './theme.config'

const host = 'https://jan-mueller.at'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} · Jan Müller` : 'Jan Müller'
    },
    title: undefined,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@1,600&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue-masonry-wall' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    [
      'nuxt-i18n',
      {
        defaultLocale: 'en',
        noPrefixDefaultLocale: false,
        locales: [
          {
            code: 'en',
            name: 'English',
          },
          {
            code: 'de',
            name: 'Deutsch',
          },
        ],
        vueI18n: i18n,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs'],
  },

  feed() {
    const blogUrl = `${host}/blog`
    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      json: { type: 'json1', file: 'feed.json' },
    }
    const { $content } = require('@nuxt/content')

    const createFeedArticles = async function (feed) {
      feed.options = {
        title: "Jan's Blog",
        description: 'Software engineering and computer science.',
        link: blogUrl,
        language: 'en',
      }
      const posts = await $content('en/blog').fetch()

      posts.forEach((post) => {
        const url = `${blogUrl}/${post.slug}`

        const item = {
          title: post.title,
          id: url,
          link: url,
          date: new Date(post.createdAt),
          description: post.description,
          content: post.bodyText,
          categories: post.tags,
        }

        feed.addItem(item)
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `/feed/${file}`,
      type,
      create: createFeedArticles,
    }))
  },

  sitemap: {
    hostname: host,
    gzip: true,
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.flatMap((file) =>
        file.path === '/de/home' || file.path === '/en/home'
          ? []
          : [file.path.replace('/en/', ''), file.path.replace('/en/', '/de/')]
      )
    },
    i18n: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: themes.dark,
        light: themes.light,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: {
    color: primaryColor,
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      const md = require('markdown-it')()
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)
        document.readingTime = text
        document.bodyText = md.render(document.text)
      }
    },
  },
}
