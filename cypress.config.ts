import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'nhkgy5',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'http://localhost:4173',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  retries: 2,
})
