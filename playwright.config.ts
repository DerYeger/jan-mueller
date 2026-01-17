import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI
const port = 4321
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    ...(isCI
      ? []
      : [
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
          },
          {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
          },
        ]),
  ],
  webServer: {
    command: `nr ${isCI ? 'preview' : 'dev'} --port=${port}`,
    url: baseURL,
    reuseExistingServer: !isCI,
  },
})
