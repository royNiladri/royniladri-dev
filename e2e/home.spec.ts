import { expect, test } from '@playwright/test';
import { caseStudies, profile, selfHosted } from './helpers/content.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('hero states who he is and what he is open to', async ({ page }) => {
  await expect(page).toHaveTitle(profile.name);

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toContainText(profile.headline);

  await expect(page.getByText(profile.intro)).toBeVisible();
  await expect(page.getByText(profile.current.title, { exact: true })).toBeVisible();
  await expect(page.getByText(profile.status, { exact: true })).toBeVisible();
});

test('every case study has a card that links to its story', async ({ page }) => {
  const cards = page.locator('#stories a[href^="/stories/"]');
  await expect(cards).toHaveCount(caseStudies.length);

  for (const study of caseStudies) {
    const card = page.locator(`#stories a[href="/stories/${study.slug}"]`);
    await expect(card).toContainText(study.title);
    await expect(card).toContainText(study.metric);
    await expect(card).toContainText(study.metricLabel);
    for (const layer of study.layers) {
      await expect(card.getByText(layer, { exact: true })).toBeVisible();
    }
  }

  await page
    .locator('#stories')
    .getByRole('link', { name: 'All work history →' })
    .click();
  await expect(page).toHaveURL(/\/work$/);
});

test('the self-hosted section lists every service and the backup chain', async ({
  page,
}) => {
  const section = page.locator('#self-hosted');
  await expect(section).toBeVisible();

  for (const group of selfHosted.groups) {
    await expect(section.getByText(group.group, { exact: true })).toBeVisible();
    for (const service of group.services) {
      await expect(
        section.getByText(service.name, { exact: true }),
      ).toBeVisible();
    }
  }

  // Homebox has no Simple Icon, so it falls back to its initial letter.
  const homebox = section
    .locator('.service')
    .filter({ hasText: 'Homebox' })
    .locator('.initial');
  await expect(homebox).toHaveText('H');

  const nodes = selfHosted.backupChain.filter((step) => 't' in step);
  const edges = selfHosted.backupChain.filter((step) => 'e' in step);
  await expect(section.locator('.node')).toHaveCount(nodes.length);
  await expect(section.locator('.edge')).toHaveCount(edges.length);
});

test('nav marks the current page and reaches every section', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Primary' });

  await nav.getByRole('link', { name: 'Self-hosted' }).click();
  await expect(page).toHaveURL(/#self-hosted$/);
  await expect(page.locator('#self-hosted')).toBeInViewport();

  await nav.getByRole('link', { name: 'Contact' }).click();
  await expect(page.locator('#contact')).toBeInViewport();

  await nav.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('images that have not been supplied render as placeholders, not 404s', async ({
  page,
}) => {
  const failures: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(failures).toEqual([]);

  // The portrait is a real file; the hero has not been supplied yet.
  await expect(page.locator(`img[src="${profile.portrait}"]`)).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Landscape photograph by Niladri Roy' }),
  ).toBeVisible();
});

test('the page has one h1 and a working skip link', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
});
