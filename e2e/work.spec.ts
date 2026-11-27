import { expect, test } from '@playwright/test';
import {
  employers,
  forEmployer,
  roleProjects,
  skillWithNonHighlightRole,
  totalHighlights,
  totalProjects,
  totalRoles,
  withSkill,
} from './helpers/content.ts';

const role = (id: string) => `[data-role="${id}"]`;
const visibleProjects = (scope: { locator: (s: string) => any }) =>
  scope.locator('[data-proj]').filter({ visible: true });

/** Informatica → Lead Software Engineer: the role with the most projects. */
const busiestRole = employers[1]!.roles[1]!;

test.beforeEach(async ({ page }) => {
  await page.goto('/work');
});

test.describe('Highlights view (default)', () => {
  test('lands collapsed, with a count line summarising the history', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: "Where I've worked" }),
    ).toBeVisible();

    await expect(page.locator('[data-count-line]')).toHaveText(
      `Showing ${totalHighlights} highlights of ${totalProjects} projects.`,
    );

    // Every role renders, and every one of them starts closed.
    await expect(page.locator('[data-role]')).toHaveCount(totalRoles);
    await expect(page.locator('[data-role][data-open="false"]')).toHaveCount(
      totalRoles,
    );

    // Collapsed roles advertise their highlights as chips instead.
    await expect(page.locator('[data-hi-chip]').first()).toBeVisible();
    await expect(page.locator('[data-proj]').first()).not.toBeVisible();
  });

  test('opening a role shows only its highlights', async ({ page }) => {
    const all = roleProjects(busiestRole.id);
    const highlights = all.filter((p) => p.highlight);

    const block = page.locator(role(busiestRole.id));
    const toggle = block.locator('[data-role-toggle]');

    await expect(toggle).toHaveText(`+ Show ${highlights.length} highlights`);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();

    await expect(block).toHaveAttribute('data-open', 'true');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveText('− Collapse');
    await expect(visibleProjects(block)).toHaveCount(highlights.length);

    // ...and offers the rest behind a dashed button.
    await expect(block.locator('[data-role-more]')).toHaveText(
      `+ ${all.length - highlights.length} more in Everything`,
    );
  });

  test('"+ N more" switches the whole page to Everything', async ({ page }) => {
    const block = page.locator(role(busiestRole.id));

    await block.locator('[data-role-toggle]').click();
    await block.locator('[data-role-more]').click();

    await expect(page.locator('[data-view-pick="all"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('[data-role][data-open="true"]')).toHaveCount(
      totalRoles,
    );
    await expect(page.locator('[data-count-line]')).toHaveText(
      `Showing all ${totalProjects} projects.`,
    );
  });
});

test.describe('Everything view', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('[data-view-pick="all"]').click();
  });

  test('opens every role with every project', async ({ page }) => {
    await expect(visibleProjects(page)).toHaveCount(totalProjects);
    await expect(page.locator('[data-hi-chip]').first()).not.toBeVisible();
  });

  test('roles can still be collapsed one at a time', async ({ page }) => {
    const block = page.locator(role(busiestRole.id));

    await block.locator('[data-role-toggle]').click();

    await expect(block).toHaveAttribute('data-open', 'false');
    await expect(page.locator('[data-role][data-open="true"]')).toHaveCount(
      totalRoles - 1,
    );
  });
});

test.describe('Filtering', () => {
  test('a skill chip hides roles and employers with no matches', async ({
    page,
  }) => {
    const skill = 'AI/ML';
    const matching = withSkill(skill);
    const employersWithSkill = new Set(matching.map((p) => p.employerId));

    await page.locator('[data-view-pick="all"]').click();
    await page.locator(`[data-skill-pick="${skill}"]`).click();

    await expect(page.locator('section[data-emp]:not([hidden])')).toHaveCount(
      employersWithSkill.size,
    );
    await expect(visibleProjects(page)).toHaveCount(matching.length);
    await expect(page.locator('[data-count-line]')).toHaveText(
      `Showing all ${matching.length} projects tagged ${skill}.`,
    );

    // The rail itself stays complete, so the filter can be changed again.
    await expect(page.locator('[data-employer-pick]')).toHaveCount(
      employers.length + 1,
    );
  });

  test('a role with matches but no highlights offers Everything instead', async ({
    page,
  }) => {
    const { skill, roleId } = skillWithNonHighlightRole();
    const matching = roleProjects(roleId).filter((p) =>
      p.skills.includes(skill),
    );

    await page.locator(`[data-skill-pick="${skill}"]`).click();

    const block = page.locator(role(roleId));
    const toggle = block.locator('[data-role-toggle]');
    await expect(toggle).toHaveText(`See ${matching.length} in Everything`);

    await toggle.click();

    await expect(page.locator('[data-view-pick="all"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(block).toHaveAttribute('data-open', 'true');
  });

  test('picking an employer narrows the page to that employer', async ({
    page,
  }) => {
    const employer = employers[2]!; // Visa
    const owned = forEmployer(employer.id);

    await page.locator('[data-view-pick="all"]').click();
    await page.locator(`[data-employer-pick="${employer.id}"]`).click();

    await expect(page.locator('section[data-emp]:not([hidden])')).toHaveCount(1);
    await expect(page.locator(`section[data-emp="${employer.id}"]`)).toBeVisible();
    await expect(visibleProjects(page)).toHaveCount(owned.length);
    await expect(page.locator('[data-count-line]')).toHaveText(
      `Showing all ${owned.length} projects at ${employer.name}.`,
    );
  });

  test('an impossible combination explains itself and can be reset', async ({
    page,
  }) => {
    await page.locator('[data-employer-pick="visa"]').click();
    await page.locator('[data-skill-pick="AI/ML"]').click();

    const empty = page.locator('[data-empty]');
    await expect(empty).toBeVisible();
    await expect(page.locator('section[data-emp]:not([hidden])')).toHaveCount(0);

    await empty.getByRole('button', { name: 'Clear filters' }).click();

    await expect(empty).toBeHidden();
    await expect(page.locator('section[data-emp]:not([hidden])')).toHaveCount(
      employers.length,
    );
  });
});

test.describe('Shareable state', () => {
  test('filters are written to the query string', async ({ page }) => {
    await page.locator('[data-view-pick="all"]').click();
    await page.locator('[data-skill-pick="AI/ML"]').click();
    await page.locator('[data-employer-pick="inf"]').click();

    const url = new URL(page.url());
    expect(url.searchParams.get('view')).toBe('all');
    expect(url.searchParams.get('skill')).toBe('AI/ML');
    expect(url.searchParams.get('employer')).toBe('inf');

    // Defaults are left out rather than spelled out.
    await page.locator('[data-view-pick="hi"]').click();
    await page.locator('[data-skill-pick="All"]').click();
    await page.locator('[data-employer-pick="all"]').click();
    expect(new URL(page.url()).search).toBe('');
  });

  test('a shared link restores the same view', async ({ page }) => {
    await page.goto('/work?view=all&skill=AI%2FML&employer=inf');

    await expect(page.locator('[data-view-pick="all"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('[data-skill-pick="AI/ML"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('[data-employer-pick="inf"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(visibleProjects(page)).toHaveCount(
      withSkill('AI/ML').length,
    );
  });

  test('a junk query string is ignored rather than obeyed', async ({ page }) => {
    await page.goto('/work?view=sideways&skill=Telepathy&employer=acme');

    await expect(page.locator('[data-view-pick="hi"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('[data-count-line]')).toHaveText(
      `Showing ${totalHighlights} highlights of ${totalProjects} projects.`,
    );
  });
});
