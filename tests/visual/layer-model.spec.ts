import { expect, test } from '@playwright/test'

test('10-layer model route renders the educational model page', async ({ page }, testInfo) => {
  await page.goto('/10-layer-model')

  await expect(
    page.getByRole('heading', {
      name: /why a single website check misses operational context/i,
    }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: /the 10-layer model list/i })).toBeVisible()
  const layerList =
    testInfo.project.name === 'mobile'
      ? page.getByLabel('Compact mobile 10-layer list')
      : page.locator('.layer-list--desktop')

  await expect(layerList.getByText('DOM and client boundary')).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  if (testInfo.project.name === 'mobile') {
    const viewportScreens = await page.evaluate(
      () => document.documentElement.scrollHeight / window.innerHeight,
    )
    expect(viewportScreens).toBeLessThanOrEqual(5)

    const heroFormGap = await page
      .locator('.landing-hero__form')
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).gap))
    expect(heroFormGap).toBeGreaterThanOrEqual(10)
  }
})

test('legacy landing route aliases to the 10-layer model page', async ({ page }) => {
  await page.goto('/landing')

  await expect(
    page.getByRole('heading', {
      name: /why a single website check misses operational context/i,
    }),
  ).toBeVisible()
})
