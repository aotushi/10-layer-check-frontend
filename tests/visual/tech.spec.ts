import { expect, test } from '@playwright/test'

test('tech route renders the documented architecture page', async ({ page }, testInfo) => {
  await page.goto('/tech')

  await expect(
    page.getByRole('heading', {
      name: /technical architecture for the 10-layer diagnostic system/i,
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /what each part of the system owns/i }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /frontend, backend, database, ai, seo, and quality stack/i }),
  ).toBeVisible()
  await expect(page.getByText('Vue 3').first()).toBeVisible()
  await expect(page.getByText('Cloudflare Worker API').first()).toBeVisible()
  await expect(page.getByText('D1').first()).toBeVisible()
  await expect(page.getByText('Workers AI').first()).toBeVisible()
  await expect(page.getByText('Frontend SEO').first()).toBeVisible()
  await expect(page.getByText('Histoire').first()).toBeVisible()
  await expect(page.getByText('Playwright').first()).toBeVisible()
  await expect(page.getByText('SEO as engineering quality').first()).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  if (testInfo.project.name === 'mobile') {
    const viewportScreens = await page.evaluate(
      () => document.documentElement.scrollHeight / window.innerHeight,
    )
    expect(viewportScreens).toBeLessThanOrEqual(7)

    const heroActionGap = await page
      .locator('.tech-hero__actions')
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).gap))
    expect(heroActionGap).toBeGreaterThanOrEqual(10)
  }
})

test('tech screenshot baseline', async ({ page }) => {
  await page.goto('/tech', { waitUntil: 'networkidle' })
  await expect(page).toHaveScreenshot('tech-full-page.png', {
    animations: 'disabled',
    fullPage: true,
  })
})
