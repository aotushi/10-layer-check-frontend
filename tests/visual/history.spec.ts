import { expect, test } from '@playwright/test'

test('history route renders the product history workspace', async ({ page }, testInfo) => {
  await page.goto('/dashboard/history')

  await expect(page.getByRole('heading', { name: 'Scan history' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Previous diagnostic runs' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Login required' })).toBeVisible()
  await expect(page.getByText('0 records')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Login' }).first()).toBeVisible()
  await expect(page.locator('.site-header')).toHaveCount(0)

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  if (testInfo.project.name === 'mobile') {
    const mobileState = await page.evaluate(() => {
      const summary = document.querySelector('.history-summary')
      const summaryRect = summary?.getBoundingClientRect()

      return {
        summaryInFirstViewport: Boolean(summaryRect && summaryRect.top < window.innerHeight),
      }
    })

    expect(mobileState.summaryInFirstViewport).toBe(true)
  }
})

test('history screenshot baseline', async ({ page }) => {
  await page.goto('/dashboard/history', { waitUntil: 'networkidle' })
  await expect(page).toHaveScreenshot('history-full-page.png', {
    animations: 'disabled',
    fullPage: true,
  })
})
