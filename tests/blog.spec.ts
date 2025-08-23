import { expect, test } from '@playwright/test'

test.describe('Blog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
  })

  test('can navigate to a post', async ({ page }) => {
    await page.getByTestId('blog-post-vue-masonry-wall').click()
    await expect(page).toHaveURL('/blog/vue-masonry-wall/')
  })

  test('shows the details of a blog post', async ({ page }) => {
    const card = page.getByTestId('blog-post-vue-masonry-wall')
    await expect(card).toBeVisible()
    await expect(card).toContainText('Aug 16, 2021')
    await expect(card).toContainText('SSR support')
  })
})
