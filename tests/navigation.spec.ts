import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/legal-notice')
  })

  test('has a link to the home page', async ({ page }) => {
    const homeLink = page.locator('nav').getByRole('link', { name: 'Home' })
    await homeLink.click()
    await expect(page).toHaveURL('/')
  })

  test('has a link to the blog page', async ({ page }) => {
    const blogLink = page.locator('nav').getByRole('link', { name: 'Blog' })
    await blogLink.click()
    await expect(page).toHaveURL('/blog')
  })

  test('has a link to the photography page', async ({ page }) => {
    const photographyLink = page.locator('nav').getByRole('link', { name: 'Photography' })
    await photographyLink.click()
    await expect(page).toHaveURL('/photography')
  })
})
