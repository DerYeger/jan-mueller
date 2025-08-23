import { expect, test } from '@playwright/test'

test.describe('About', () => {
  test('has an impressum', async ({ page }) => {
    await page.goto('/impressum')
    const header = page.getByRole('heading', { name: 'Impressum' })
    await expect(header).toBeVisible()
  })

  test('has a legal notice', async ({ page }) => {
    await page.goto('/legal-notice')
    const header = page.getByRole('heading', { name: 'Legal Notice' })
    await expect(header).toBeVisible()
  })
})
