import { expect, test } from '@playwright/test'

test('home route renders the accepted Stitch home structure', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', {
      name: /scan a public website and receive a structured 10-layer diagnostic report/i,
    }),
  ).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  if (testInfo.project.name === 'mobile') {
    const viewportScreens = await page.evaluate(
      () => document.documentElement.scrollHeight / window.innerHeight,
    )
    expect(viewportScreens).toBeLessThanOrEqual(5)

    const scanFormGap = await page
      .locator('.scan-form')
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).gap))
    expect(scanFormGap).toBeGreaterThanOrEqual(10)
  }
})

test('home screenshot baseline after accepted Stitch implementation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page).toHaveScreenshot('home-full-page.png', {
    animations: 'disabled',
    fullPage: true,
  })
})

test('home scan action shows the model update notice without API request', async ({ page }) => {
  const scanRequests: string[] = []

  page.on('request', (request) => {
    if (request.url().includes('/scan/jobs')) {
      scanRequests.push(request.url())
    }
  })

  await page.goto('/')
  await page.getByRole('button', { name: /run scan/i }).click()

  await expect(
    page.getByText('The model is under updating, U can check the example account data'),
  ).toBeVisible()
  await expect(page).toHaveURL(/\/$/)
  expect(scanRequests).toEqual([])
})
