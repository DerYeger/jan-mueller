import AxeBuilder from '@axe-core/playwright'
import { BASE_THRESHOLDS, lighthouseTest, PAGES } from 'tests/config'
import { playAudit } from 'playwright-lighthouse'
import { expect } from '@playwright/test'

lighthouseTest.describe('Lighthouse', () => {
  lighthouseTest.beforeEach(async ({ browserName }) => {
    lighthouseTest.skip(browserName !== 'chromium', 'Lighthouse only runs on Chromium')
  })

  for (const { url, thresholds, skip } of PAGES) {
    lighthouseTest(url, async ({ page, port }) => {
      await page.goto(url)

      if (!skip?.accessibility) {
        const accessibilityScanResults = await new AxeBuilder({ page })
          .exclude('.baklava-editor')
          .exclude('.expressive-code')
          .exclude('button[id^="factorize-"]')
          .exclude('button[id^="benchmark-"]')
          .analyze()
        expect(accessibilityScanResults.violations).toEqual([])
      }

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
