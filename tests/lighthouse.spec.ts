import { lighthouseTest } from 'tests/utils'
import { playAudit } from 'playwright-lighthouse'
import type { playwrightLighthouseConfig } from 'playwright-lighthouse'

lighthouseTest.describe('Lighthouse', () => {
  lighthouseTest.beforeEach(async ({ browserName }) => {
    lighthouseTest.skip(!process.env.CI || browserName !== 'chromium', 'Lighthouse only runs on Chromium')
  })

  type Thresholds = playwrightLighthouseConfig['thresholds']

  const BASE_THRESHOLDS: Thresholds = {
    performance: 100,
    accessibility: 100,
    'best-practices': 100,
    seo: 100,
    pwa: undefined,
  }

  const pages: { url: `/${string}`, thresholds?: Thresholds }[] = [
    // Home
    {
      url: '/',
      thresholds: {
        performance: 98, // preview serves images inefficiently
      },
    },
    // Legal
    { url: '/impressum' },
    { url: '/legal-notice' },
    // Blog
    { url: '/blog' },
    { url: '/blog/next-level-heading-anchors' },
    {
      url: '/blog/react-leaflet',
      thresholds: {
        accessibility: 0, // OpenStreetMap drops accessibility to 0
        performance: 98, // OpenStreetMap overhead
      },
     },
    { url: '/blog/vue-composable-testing' },
    {
      url: '/blog/vue-marmoset-viewer',
      thresholds: {
        accessibility: 94, // marmoset viewer has input without alt
        'best-practices': 82, // marmoset viewer loads image via http
      },
    },
    { url: '/blog/vue-masonry-wall' },
    {
      url: '/blog/web-workers',
      thresholds: {
        accessibility: 96, // example button color contrast
      },
     },
    // Photography
    {
      url: '/photography',
      thresholds: {
        performance: 75, // preview serves images inefficiently
      },
    },
    {
      url: '/photography/maps/japan',
      thresholds: {
        accessibility: 0, // OpenStreetMap drops accessibility to 0
        performance: 90, // preview serves images inefficiently
      },
    },
    // Experiments
    { url: '/experiments' },
    { url: '/experiments/vector-nodes' },
  ]

  for (const { url, thresholds } of pages) {
    lighthouseTest(url, async ({ page, port }) => {
      await page.goto(url)
      await playAudit({
        page,
        port,
        reports: {
          formats: {
            html: true,
          },
          directory: 'lighthouse-reports',
          name: url.replace(/\//g, '_').replace(/^_/, ''),
        },
        thresholds: { ...BASE_THRESHOLDS, ...(thresholds ?? {}) },
      })
    })
  }
})
