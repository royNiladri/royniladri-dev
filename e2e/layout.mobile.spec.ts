/**
 * Phone layout (Pixel 5, 393px). Runs as the `mobile` project.
 */
import { expect, test } from '@playwright/test';
import { employers, totalProjects } from './helpers/content.ts';

const pages = ['/', '/work', '/stories', '/stories/js-big-decimal'];

for (const path of pages) {
  test(`${path} does not scroll sideways`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test(`${path} keeps a gutter on both sides`, async ({ page }) => {
    await page.goto(path);

    // Nothing paints flush against the screen edge except full-bleed bands.
    const heading = page.getByRole('heading', { level: 1 }).first();
    const box = await heading.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.x).toBeGreaterThanOrEqual(16);
  });
}

test('the employer rail becomes a scrolling row with tappable buttons', async ({
  page,
}) => {
  await page.goto('/work');

  const rail = page.locator('.employers');
  await expect(rail).toBeVisible();
  await expect(rail).toHaveCSS('flex-direction', 'row');

  const buttons = page.locator('[data-employer-pick]');
  await expect(buttons).toHaveCount(employers.length + 1);

  for (const button of await buttons.all()) {
    const box = await button.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(40);
  }
});

test('roles stay tappable and expand in place', async ({ page }) => {
  await page.goto('/work');

  const toggle = page.locator('[data-role-toggle]').first();
  const box = await toggle.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(34);

  await toggle.tap();
  await expect(page.locator('[data-role]').first()).toHaveAttribute(
    'data-open',
    'true',
  );
});

test('tech chips collapse to one monospace line', async ({ page }) => {
  await page.goto('/work?view=all');

  const chip = page.locator('[data-proj] .chip').first();
  await expect(chip).toBeVisible();
  // The icon is dropped and the chip background removed on phones.
  await expect(chip.locator('svg')).toBeHidden();
  await expect(chip).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test('the backup chain turns vertical', async ({ page }) => {
  await page.goto('/');

  const chain = page.locator('.chain-row');
  await expect(chain).toHaveCSS('flex-direction', 'column');

  const nodes = page.locator('.node');
  const first = await nodes.first().boundingBox();
  const last = await nodes.last().boundingBox();
  expect(last!.y).toBeGreaterThan(first!.y);
});

test('filtering still works on a phone', async ({ page }) => {
  await page.goto('/work');

  await page.locator('[data-view-pick="all"]').tap();
  await expect(page.locator('[data-proj]:not([hidden])')).toHaveCount(
    totalProjects,
  );

  await page.locator('[data-employer-pick="visa"]').tap();
  await expect(page.locator('section[data-emp]:not([hidden])')).toHaveCount(1);
});
