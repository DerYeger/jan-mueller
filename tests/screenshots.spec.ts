import { BASE_SCREENSHOT, PAGES } from 'tests/config'
import test, { expect } from '@playwright/test'
import type { Locator } from '@playwright/test'
import process from 'node:process'

const colorSchemes = ['light', 'dark'] as const

test.describe('Screenshots', () => {
  test.beforeEach(async ({ browserName }) => {
    test.skip(browserName !== 'chromium' || process.platform !== 'darwin')
  })

  for (const colorScheme of colorSchemes) {
    test.describe(`${colorScheme} mode`, () => {
      for (const { url, screenshot } of PAGES) {
        test(url, async ({ page }) => {
          await page.emulateMedia({ reducedMotion: 'reduce', colorScheme })
          await page.goto(url)
          const mask: Locator[] = [
            page.locator('.marmoset-viewer-host'),
            page.locator('.leaflet-container'),
            page.locator('.neon-bar-experiment'),
            page.locator('.baklava-node'),
            page.locator('.turbo-graph'),
          ]
          await expect(page).toHaveScreenshot({ ...BASE_SCREENSHOT, ...(screenshot ?? {}), mask })
        })
      }
    })
  }
})
