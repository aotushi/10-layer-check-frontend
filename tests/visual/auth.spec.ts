import { expect, test, type Page } from '@playwright/test'

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

test('public header width remains stable when navigating from long public page to login', async ({
  page,
}) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024, 'desktop scrollbar-gutter check')

  const readHeaderMetrics = () =>
    page.evaluate(() => {
      const header = document.querySelector('.site-header__inner')?.getBoundingClientRect()

      return {
        headerLeft: Math.round(header?.left ?? -1),
        headerWidth: Math.round(header?.width ?? -1),
        hasVerticalScrollbar:
          document.documentElement.scrollHeight > document.documentElement.clientHeight,
      }
    })

  await page.goto('/tech')
  const techMetrics = await readHeaderMetrics()

  await page.goto('/login')
  const loginMetrics = await readHeaderMetrics()

  expect(techMetrics.hasVerticalScrollbar).toBe(true)
  expect(loginMetrics.hasVerticalScrollbar).toBe(false)
  expect(loginMetrics.headerLeft).toBe(techMetrics.headerLeft)
  expect(loginMetrics.headerWidth).toBe(techMetrics.headerWidth)
})

test('public header shows account entry when a session exists', async ({ page }) => {
  await seedAuthSession(page)

  await page.goto('/')

  const primaryNav = page.getByRole('navigation', { name: 'Primary navigation' })
  await expect(primaryNav.getByRole('link', { name: 'Login' })).toHaveCount(0)
  await expect(
    primaryNav.getByRole('link', { name: 'Open account workspace for demo@10-layer-check.test' }),
  ).toBeVisible()
  await expect(primaryNav.getByText('demo', { exact: true })).toBeVisible()
})

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

test('login keeps protected redirect and returns to target after authentication', async ({
  page,
}) => {
  await mockLogin(page)
  await mockEmptyHistory(page)

  await page.goto('/login?redirect=/dashboard/history')

  await expect(page.locator('.auth-form__switch').getByRole('link')).toHaveAttribute(
    'href',
    '/register?redirect=%2Fdashboard%2Fhistory',
  )

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL(/\/dashboard\/history$/)
  await expect(page.getByRole('heading', { name: 'Scan history', exact: true })).toBeVisible()
})

async function mockLogin(page: Page): Promise<void> {
  await page.route('http://127.0.0.1:8787/user/login', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        token: 'visual-test-token',
        user: {
          id: 'visual-test-user',
          email: 'reviewer@example.com',
        },
      }),
    })
  })
}

async function seedAuthSession(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'site-10-layer-check.auth.v1',
      JSON.stringify({
        token: 'visual-test-token',
        user: {
          id: 'visual-test-user',
          email: 'demo@10-layer-check.test',
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
