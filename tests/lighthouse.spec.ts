import { BASE_THRESHOLDS, lighthouseTest, PAGES } from 'tests/config'
import { playAudit } from 'playwright-lighthouse'
import process from 'node:process'

lighthouseTest.describe('Lighthouse', () => {
  lighthouseTest.beforeEach(async ({ browserName }) => {
    lighthouseTest.skip(!process.env.CI || browserName !== 'chromium', 'Lighthouse only runs on Chromium')
  })

  for (const { url, thresholds } of PAGES) {
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
        disableLogs: true,
        thresholds: { ...BASE_THRESHOLDS, ...(thresholds ?? {}) },
      })
    })
  }
})
