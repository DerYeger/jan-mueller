import { expect, test } from '@playwright/test'

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has a link to the about page', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: 'Legal Notice' }).click()
    await expect(page).toHaveURL('/legal-notice/')
  })

  test('has a link to the Impressum', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: 'Impressum' }).click()
    await expect(page).toHaveURL('/impressum/')
  })

  test('has a link to the source', async ({ page }) => {
    const footer = page.locator('footer')
    const sourceLink = footer.getByRole('link', { name: 'Source' })
    await expect(sourceLink).toBeVisible()
    await expect(sourceLink).toHaveAttribute('href', 'https://github.com/DerYeger/jan-mueller')
  })

  test('has a copyright notice', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toContainText(`${new Date().getFullYear()} © Jan Müller`)
  })
})
