import { expect, test } from '@playwright/test';
import { caseStudies, projects } from './helpers/content.ts';

test('the index lists every story', async ({ page }) => {
  await page.goto('/stories');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Stories from the work',
  );
  await expect(page.locator('a[href^="/stories/"]')).toHaveCount(
    caseStudies.length,
  );
});

for (const study of caseStudies) {
  test(`"${study.title}" renders its header, prose and aside`, async ({
    page,
  }) => {
    await page.goto(`/stories/${study.slug}`);

    await expect(page).toHaveTitle(new RegExp(study.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(study.title);

    // Headline metric first, then the two tiles from the Markdown frontmatter.
    const tiles = page.locator('.tile');
    await expect(tiles).toHaveCount(3);
    await expect(tiles.first()).toContainText(study.metric);
    await expect(tiles.first()).toContainText(study.metricLabel);

    // The four prose sections from the Markdown body.
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(
      page.getByRole('heading', { name: 'Context', level: 2 }),
    ).toBeVisible();

    // The aside is derived from the linked project, not written twice.
    const linked = projects.find((p) => p.title && p.roleId);
    expect(linked).toBeTruthy();
    await expect(page.getByText('My role', { exact: true })).toBeVisible();
    await expect(page.getByText('Tech', { exact: true })).toBeVisible();
  });
}

test('a story deep-links into the matching role in the work history', async ({
  page,
}) => {
  await page.goto('/stories/js-big-decimal');

  await page
    .getByRole('link', { name: 'See it in the work history →' })
    .click();

  await page.waitForURL(/\/work\?/);
  const url = new URL(page.url());
  expect(url.pathname).toBe('/work');
  expect(url.searchParams.get('employer')).toBe('visa');
  expect(url.searchParams.get('view')).toBe('all');
  expect(url.hash).toBe('#role-v2');

  // The linked role is opened and scrolled to, with its employer selected.
  const role = page.locator('[data-role="v2"]');
  await expect(role).toHaveAttribute('data-open', 'true');
  await expect(role).toBeInViewport();
  await expect(page.locator('[data-employer-pick="visa"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('stories chain to the next one', async ({ page }) => {
  await page.goto(`/stories/${caseStudies[0]!.slug}`);

  await page.getByRole('link', { name: /^Next story:/ }).click();
  await expect(page).toHaveURL(`/stories/${caseStudies[1]!.slug}`);
});

test('a project with an external link exposes it', async ({ page }) => {
  await page.goto('/work?view=all');

  const npmLink = page.getByRole('link', { name: /js-big-decimal on npm/ });
  await expect(npmLink).toHaveAttribute(
    'href',
    'https://www.npmjs.com/package/js-big-decimal',
  );
});
