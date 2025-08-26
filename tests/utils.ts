import test, { chromium } from '@playwright/test'
import type { Browser } from '@playwright/test'
import getPort from 'get-port'

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
