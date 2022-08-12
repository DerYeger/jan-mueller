import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'nhkgy5',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    baseUrl: 'http://localhost:4173',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  retries: 2,
})
