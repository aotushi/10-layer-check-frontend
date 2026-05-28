import { expect, test } from '@playwright/test'

test('tech route renders the documented architecture page', async ({ page }, testInfo) => {
  await page.goto('/tech')

  await expect(
    page.getByRole('heading', {
      name: /technical architecture for the 10-layer diagnostic system/i,
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /public domain to evidence-backed report artifact/i }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /runtime boundaries behind the pipeline/i }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /how evidence becomes a readable technical report/i }),
  ).toBeVisible()
  await expect(page.locator('.architecture-card').filter({ hasText: 'Vue 3' })).toBeVisible()
  await expect(
    page.locator('.architecture-card').filter({ hasText: 'Cloudflare Worker API' }),
  ).toBeVisible()
  await expect(
    page.locator('.architecture-card').filter({ hasText: 'D1 and KV storage' }),
  ).toBeVisible()
  await expect(page.locator('.architecture-card').filter({ hasText: 'Workers AI' })).toBeVisible()
  await expect(page.locator('.pipeline-map text').filter({ hasText: 'Histoire' })).toBeVisible()
  await expect(page.locator('.pipeline-map text').filter({ hasText: 'Playwright' })).toBeVisible()
  await expect(
    page.locator('.architecture-card').filter({ hasText: 'SEO-safe public artifact' }),
  ).toBeVisible()

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
