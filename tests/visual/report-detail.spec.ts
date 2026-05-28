import { expect, test, type Page } from '@playwright/test'

test('report detail route renders the product report surface', async ({ page }, testInfo) => {
  await setAuthSession(page)
  await page.goto('/dashboard/reports/sample-overreacted')

  await expect(page.getByRole('heading', { name: 'overreacted.io' })).toBeVisible()
  await expect(page.getByText('Persisted selected smoke result')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /risk signals that should be reviewed first/i }),
  ).toBeVisible()
  await expect(page.getByText('E046').first()).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /explicit gaps before the next review pass/i }),
  ).toBeVisible()

  await expect(page.locator('.site-header')).toHaveCount(0)

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  if (testInfo.project.name === 'mobile') {
    const viewportCoverage = await page.evaluate(() => {
      const priority = document.querySelector('.priority-panel')
      const rect = priority?.getBoundingClientRect()
      return {
        hasPriorityInFirstViewport: Boolean(rect && rect.top < window.innerHeight),
        scrollableTables: Array.from(document.querySelectorAll('.evidence-table')).filter(
          (element) => element.scrollWidth > element.clientWidth,
        ).length,
      }
    })

    expect(viewportCoverage.hasPriorityInFirstViewport).toBe(true)
    expect(viewportCoverage.scrollableTables).toBeGreaterThan(0)
  }
})

test('report detail screenshot baseline', async ({ page }) => {
  await setAuthSession(page)
  await page.goto('/dashboard/reports/sample-overreacted', { waitUntil: 'networkidle' })
  await expect(page).toHaveScreenshot('report-detail-full-page.png', {
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
