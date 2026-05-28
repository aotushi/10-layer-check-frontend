import { expect, test, type Page } from '@playwright/test'

test('dashboard history redirects unauthenticated users to login', async ({ page }) => {
  await page.goto('/dashboard/history')

  await expect(page).toHaveURL(/\/login\?redirect=\/dashboard\/history$/)
  await expect(page.getByRole('heading', { name: 'Sign in to scan history' })).toBeVisible()
})

test('unknown history route renders 404 instead of product history', async ({ page }) => {
  await page.goto('/history')

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await expect(page.getByText('This address is not part of the public site')).toBeVisible()
  await expect(page.locator('.site-header')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Scan history' })).toHaveCount(0)
})

test('dashboard history renders for authenticated users', async ({ page }, testInfo) => {
  await mockEmptyHistory(page)
  await setAuthSession(page)
  await page.goto('/dashboard/history')

  await expect(page.getByRole('heading', { name: 'Scan history', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Previous diagnostic runs' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'No scan history yet' })).toBeVisible()
  await expect(page.getByText('0 records')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Run first scan' })).toBeVisible()
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

test('dashboard history screenshot baseline', async ({ page }) => {
  await mockEmptyHistory(page)
  await setAuthSession(page)
  await page.goto('/dashboard/history', { waitUntil: 'networkidle' })
  await expect(page).toHaveScreenshot('history-full-page.png', {
    animations: 'disabled',
    fullPage: true,
  })
})

async function setAuthSession(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'site-10-layer-check.auth.v1',
      JSON.stringify({
        token: 'visual-test-token',
        user: {
          id: 'visual-test-user',
          email: 'reviewer@example.com',
        },
      }),
    )
  })
}

async function mockEmptyHistory(page: Page): Promise<void> {
  await page.route('http://127.0.0.1:8787/user/history?*', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, history: [] }),
    })
  })
}
