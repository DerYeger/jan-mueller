import test, { chromium } from '@playwright/test'
import type { Browser, PageAssertionsToHaveScreenshotOptions } from '@playwright/test'
import getPort from 'get-port'
import type { playwrightLighthouseConfig } from 'playwright-lighthouse'

export const lighthouseTest = test.extend<
  object,
  { port: number, browser: Browser }
>({
  port: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Assign a unique port for each playwright worker to support parallel tests
      const port = await getPort()
      await use(port)
    },
    { scope: 'worker' },
  ],

  browser: [
    async ({ port }, use) => {
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
      })
      await use(browser)
    },
    { scope: 'worker' },
  ],
})

export type Thresholds = playwrightLighthouseConfig['thresholds']

export const BASE_THRESHOLDS: Thresholds = {
  performance: 100,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
}

export type ScreenshotOptions = Omit<PageAssertionsToHaveScreenshotOptions, 'mask'>

export const BASE_SCREENSHOT: ScreenshotOptions = {
  fullPage: true,
}

export const PAGES: { url: `/${string}`, thresholds?: Thresholds, screenshot?: ScreenshotOptions, skip?: { accessibility?: boolean } }[] = [
  // Home
  {
    url: '/',
    thresholds: {
      performance: 99, // allow small margin of error
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
      accessibility: 0, // OpenStreetMap drops accessibility to 0,
      performance: 99,
    },
  },
  { url: '/blog/vue-composable-testing' },
  {
    url: '/blog/vue-marmoset-viewer',
    thresholds: {
      accessibility: 94, // marmoset viewer has input without alt
      'best-practices': 81, // marmoset viewer loads image via http
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
      performance: 70, // preview serves images inefficiently
    },
    screenshot: {
      fullPage: false,
    },
  },
  {
    url: '/photography/maps/japan',
    thresholds: {
      accessibility: 0, // OpenStreetMap drops accessibility to 0
      performance: 85, // preview serves images inefficiently
    },
    skip: {
      accessibility: true,
    },
  },
  // Experiments
  { url: '/experiments' },
  { url: '/experiments/vector-nodes' },
  // Simulated 404
  { url: '/404' },
]
