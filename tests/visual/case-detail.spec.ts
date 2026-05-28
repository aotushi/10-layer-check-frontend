import { expect, test } from '@playwright/test'

test('case detail route renders lazy-loaded proof content', async ({ page }) => {
  await page.goto('/cases/overreacted-public-report')

  await expect(
    page.getByRole('heading', { name: 'overreacted.io public evidence report' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Site Analysis: overreacted.io' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Contents' })).toBeVisible()
  await expect(page.getByLabel('Case report status').getByText('Normalized records')).toBeVisible()
  await expect(page.getByText('Evidence boundaries')).toBeVisible()
  await expect(page.getByText('Executive Summary').first()).toBeVisible()
  await expect(
    page.getByText('Technical evidence alone does not prove business model or ownership.'),
  ).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('case detail screenshot baseline', async ({ page }) => {
  await page.goto('/cases/overreacted-public-report', { waitUntil: 'networkidle' })
  await expect(page).toHaveScreenshot('case-detail-full-page.png', {
    animations: 'disabled',
    fullPage: true,
  })
})
