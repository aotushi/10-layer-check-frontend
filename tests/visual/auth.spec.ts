import { expect, test } from '@playwright/test'

const authRoutes = [
  {
    route: '/login',
    heading: 'Sign in to scan history',
    switchLink: 'Create an account',
    screenshot: 'login-full-page.png',
  },
  {
    route: '/register',
    heading: 'Create a report account',
    switchLink: 'Login',
    screenshot: 'register-full-page.png',
  },
]

for (const authRoute of authRoutes) {
  test(`${authRoute.route} renders a focused auth utility page`, async ({ page }) => {
    await page.goto(authRoute.route)

    await expect(page.locator('.site-header')).toHaveCount(1)
    const primaryNav = page.getByRole('navigation', { name: 'Primary navigation' })
    const isCompactHeader = (page.viewportSize()?.width ?? 0) <= 720

    await expect(primaryNav).toBeVisible()
    await expect(page.getByRole('link', { name: '10-Layer Check' })).toBeVisible()
    await expect(primaryNav.getByRole('link', { name: 'Login' })).toBeVisible()

    if (!isCompactHeader) {
      await expect(primaryNav.getByRole('link', { name: 'Home' })).toBeVisible()
      await expect(primaryNav.getByRole('link', { name: '10-layer model' })).toBeVisible()
      await expect(primaryNav.getByRole('link', { name: 'Tech' })).toBeVisible()
    }
    await expect(page.getByRole('heading', { name: authRoute.heading })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(
      page
        .locator('.auth-form__switch')
        .getByRole('button', { name: authRoute.switchLink })
        .or(page.locator('.auth-form__switch').getByRole('link', { name: authRoute.switchLink })),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /What signing in unlocks|Why an account exists/ }),
    ).toBeVisible()

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)

    if ((page.viewportSize()?.width ?? 0) >= 1024) {
      const hasVerticalOverflow = await page.evaluate(
        () => document.documentElement.scrollHeight > document.documentElement.clientHeight,
      )
      expect(hasVerticalOverflow).toBe(false)
    }
  })

  test(`${authRoute.route} screenshot baseline`, async ({ page }) => {
    await page.goto(authRoute.route, { waitUntil: 'networkidle' })
    await expect(page).toHaveScreenshot(authRoute.screenshot, {
      animations: 'disabled',
      fullPage: true,
    })
  })
}

test('auth form exposes validation feedback without layout overflow', async ({ page }) => {
  await page.goto('/register')

  await page.getByLabel('Email').fill('invalid-email')
  await page.getByLabel('Password').fill('short')
  await page.getByRole('button', { name: 'Create account' }).click()

  await expect(page.getByText('Enter a valid email address.')).toBeVisible()
  await expect(page.getByText('Password must use at least 8 characters.')).toBeVisible()
  await expect(page.getByText('Review the highlighted fields before submitting.')).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})
