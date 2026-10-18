/**
 * The one place that reads `content.json`. Pages and components import from
 * here so nothing else has to know the file's shape.
 */

import raw from '../content/content.json';
import type {
  CaseStudy,
  Employer,
  Project,
  Role,
  SiteContent,
} from './types.ts';

const content = raw as unknown as SiteContent;

export const {
  profile,
  skills,
  employers,
  caseStudies,
  principles,
  testimonials,
  selfHosted,
  photography,
  writing,
  education,
  links,
  techIcons,
} = content;

export default content;

/** A project with its role and employer attached — handy for lookups. */
export interface ProjectContext {
  project: Project;
  role: Role;
  employer: Employer;
}

/** Every project on the site, newest employer first. */
export function allProjects(): ProjectContext[] {
  return employers.flatMap((employer) =>
    employer.roles.flatMap((role) =>
      role.projects.map((project) => ({ project, role, employer })),
    ),
  );
}

export const totals = {
  get projects() {
    return allProjects().length;
  },
  get highlights() {
    return allProjects().filter((p) => p.project.highlight).length;
  },
  get roles() {
    return employers.reduce((n, e) => n + e.roles.length, 0);
  },
};

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** The project a story was written about, plus where it sits in the history. */
export function storyContext(slug: string): ProjectContext | undefined {
  return allProjects().find((p) => p.project.caseStudy === slug);
}

/** The next story in the list, wrapping around at the end. */
export function nextCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1 || caseStudies.length < 2) return undefined;
  return caseStudies[(i + 1) % caseStudies.length];
}

/**
 * Deep link into the work history, with the role opened in Everything view.
 * Mirrors the query params the work-history island reads on load.
 */
export function workHistoryLink(employerId: string, roleId: string): string {
  return `/work?employer=${encodeURIComponent(employerId)}&view=all#role-${roleId}`;
}

/** Skill chips, in the order declared in content.json, prefixed with "All". */
export function skillFilters(): string[] {
  return ['All', ...skills];
}

/** Tech names used anywhere in the work history, de-duplicated. */
export function allTech(): string[] {
  const seen = new Set<string>();
  for (const { project } of allProjects()) {
    for (const t of project.tech) seen.add(t);
  }
  return [...seen];
}
