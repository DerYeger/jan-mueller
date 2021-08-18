import i18n from './locales/i18n'
import app from './app.config'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} · Jan Müller` : 'Jan Müller'
    },
    title: undefined,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/host' },
    { src: '~/plugins/masonryWall' },
    { src: '~/plugins/marmosetViewer' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/atoms/',
    '~/components/molecules/',
    '~/components/organisms/',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    // https://github.com/ivodolenc/nuxt-font-loader
    'nuxt-font-loader',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  fontLoader: {
    url: 'https://fonts.googleapis.com/css2?family=Cabin:wght@700&display=swap',
    prefetch: true,
    preconnect: true,
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs'],
  },

  feed() {
    const blogUrl = `${app.host}/blog`
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

  i18n: {
    baseUrl: app.host,
    defaultLocale: 'en',
    noPrefixDefaultLocale: false,
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
      },
      {
        code: 'de',
        name: 'Deutsch',
        iso: 'de-DE',
      },
    ],
    vueI18n: i18n,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: app.name,
      short_name: app.name,
    },
    meta: {
      name: app.name,
      ogImage: `${app.host}/og-logo.png`,
      ogHost: app.host,
      theme_color: app.theme.primaryColor,
      twitterCard: 'summary_large_image',
      twitterCreator: '@DerYeger',
      twitterSite: '@DerYeger',
    },
    icon: {},
  },

  sitemap: {
    gzip: true,
    hostname: app.host,
    i18n: true,
    trailingSlash: true,
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.flatMap((file) =>
        file.path === '/de/home' || file.path === '/en/home'
          ? []
          : [file.path.replace('/en/', ''), file.path.replace('/en/', '/de/')]
      )
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: {
        iconfont: 'mdiSvg',
      },
    },
    theme: {
      options: {
        customProperties: true,
      },
      dark: true,
      themes: {
        dark: app.theme.dark,
        light: app.theme.light,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: {
    color: app.theme.primaryColor,
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

  env: {
    host: app.host,
  },
}
