import { expect, test } from '@playwright/test';

const theme = (page: import('@playwright/test').Page) =>
  page.locator('html').getAttribute('data-theme');

test('defaults to light and toggles to dark', async ({ page }) => {
  await page.goto('/');
  expect(await theme(page)).toBe('light');

  await page.getByRole('button', { name: /Switch to dark theme/ }).click();

  expect(await theme(page)).toBe('dark');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
});

test('the choice survives a reload and follows you across pages', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Switch to dark theme/ }).click();

  await page.reload();
  expect(await theme(page)).toBe('dark');

  await page.goto('/work');
  expect(await theme(page)).toBe('dark');

  await page.getByRole('button', { name: /Switch to light theme/ }).click();
  await page.goto('/stories');
  expect(await theme(page)).toBe('light');
});

test('the OS preference is honoured only when nothing was chosen', async ({
  browser,
}) => {
  const dark = await browser.newContext({ colorScheme: 'dark' });
  const page = await dark.newPage();

  await page.goto('/');
  expect(await theme(page)).toBe('dark');

  // An explicit choice outranks the OS preference from then on.
  await page.getByRole('button', { name: /Switch to light theme/ }).click();
  await page.reload();
  expect(await theme(page)).toBe('light');

  await dark.close();
});

test('the theme is set before first paint, so nothing flashes', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Switch to dark theme/ }).click();

  // Capture the attribute as early as a script can observe the document.
  await page.addInitScript(() => {
    (window as unknown as { __earlyTheme?: string | null }).__earlyTheme =
      document.documentElement.dataset.theme ?? null;
  });
  await page.reload();

  // The inline head script has already run by the time body parsing starts.
  const early = await page.evaluate(
    () => document.documentElement.dataset.theme,
  );
  expect(early).toBe('dark');
});

test('blocked storage does not break the page', async ({ browser }) => {
  const context = await browser.newContext();
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('storage blocked');
      },
    });
  });

  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  expect(await theme(page)).toBe('light');

  await page.getByRole('button', { name: /Switch to dark theme/ }).click();
  expect(await theme(page)).toBe('dark');
  expect(errors).toEqual([]);

  await context.close();
});
