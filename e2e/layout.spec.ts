/**
 * Desktop layout invariants. The page gutter is easy to lose by accident — a
 * `padding` shorthand on an element that also carries `.shell` silently zeroes
 * it — so it is asserted rather than eyeballed.
 */
import { expect, test } from '@playwright/test';

const pages = ['/', '/work', '/stories', '/stories/js-big-decimal'];

for (const path of pages) {
  test(`${path} keeps the 64px page gutter`, async ({ page }) => {
    await page.goto(path);

    const heading = page.getByRole('heading', { level: 1 }).first();
    const box = await heading.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.x).toBeGreaterThanOrEqual(64);
  });

  test(`${path} does not scroll sideways`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test(`${path} loads without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(path);
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
}

test('content stays within the 1280px measure on a wide screen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: 'Primary' });
  const box = await nav.boundingBox();
  expect(box!.width).toBeLessThanOrEqual(1280);

  // Centred rather than pinned left.
  expect(Math.round(box!.x)).toBe(Math.round((1920 - box!.width) / 2));
});

test('the self-hosted band paints edge to edge behind a gutter-aligned column', async ({
  page,
}) => {
  await page.goto('/');

  const band = page.locator('#self-hosted');
  const bandBox = await band.boundingBox();
  const viewport = page.viewportSize()!;

  expect(Math.round(bandBox!.width)).toBe(viewport.width);

  const heading = band.getByRole('heading', { name: 'What I self-host' });
  const headingBox = await heading.boundingBox();
  expect(headingBox!.x).toBeGreaterThanOrEqual(64);
});

test('employer logos are fitted, not cropped', async ({ page }) => {
  await page.goto('/work');

  // Logos are rarely square. `contain` keeps the whole mark inside the tile;
  // `cover` would crop a wide logo to its middle and enlarge it.
  const logo = page.locator('.logo img').first();
  await expect(logo).toBeVisible();
  await expect(logo).toHaveCSS('object-fit', 'contain');

  const box = await logo.boundingBox();
  expect(box!.width).toBeLessThanOrEqual(32);
  expect(box!.height).toBeLessThanOrEqual(32);
});
