/**
 * The work history must be fully readable without JavaScript: everything
 * renders open, and only the controls (which would do nothing) disappear.
 */
import { expect, test } from '@playwright/test';
import { totalProjects, totalRoles } from './helpers/content.ts';

test.use({ javaScriptEnabled: false });

test('every project is visible with JavaScript off', async ({ page }) => {
  await page.goto('/work');

  await expect(page.locator('[data-proj]')).toHaveCount(totalProjects);
  await expect(page.locator('[data-proj]').first()).toBeVisible();
  await expect(page.locator('[data-proj]').last()).toBeVisible();

  // Roles render expanded rather than collapsed-with-no-way-to-open.
  await expect(page.locator('[data-role]')).toHaveCount(totalRoles);
  await expect(page.locator('[data-role] .panel').first()).toBeVisible();
});

test('controls that need JavaScript are hidden rather than dead', async ({
  page,
}) => {
  await page.goto('/work');

  await expect(page.locator('.rail')).toBeHidden();
  await expect(page.locator('[data-role-toggle]').first()).toBeHidden();
  await expect(page.locator('[data-role-more]').first()).toBeHidden();
  await expect(page.locator('[data-count-line]')).toBeHidden();
  await expect(page.locator('.segmented')).toBeHidden();

  // Highlight chips are for the collapsed state, so they stay out of the way.
  await expect(page.locator('[data-hi-chip]').first()).toBeHidden();
});

test('the rest of the site reads normally', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#self-hosted')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();

  await page.goto('/stories/js-big-decimal');
  await expect(page.locator('.prose h2')).toHaveCount(4);
});
