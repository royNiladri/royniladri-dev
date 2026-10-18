/**
 * Expectations derived from the content file itself, so the suite keeps
 * passing when content.json changes and only fails when behaviour breaks.
 */
import { readFileSync } from 'node:fs';
import type { SiteContent } from '../../src/lib/types.ts';

const content = JSON.parse(
  readFileSync(new URL('../../src/content/content.json', import.meta.url), 'utf8'),
) as SiteContent;

export const { profile, employers, caseStudies, skills, selfHosted } = content;

export interface FlatProject {
  title: string;
  skills: string[];
  highlight: boolean;
  employerId: string;
  roleId: string;
}

export const projects: FlatProject[] = employers.flatMap((employer) =>
  employer.roles.flatMap((role) =>
    role.projects.map((project) => ({
      title: project.title,
      skills: project.skills,
      highlight: project.highlight,
      employerId: employer.id,
      roleId: role.id,
    })),
  ),
);

export const totalProjects = projects.length;
export const totalHighlights = projects.filter((p) => p.highlight).length;
export const totalRoles = employers.reduce((n, e) => n + e.roles.length, 0);

export const withSkill = (skill: string) =>
  projects.filter((p) => p.skills.includes(skill));

export const forEmployer = (id: string) =>
  projects.filter((p) => p.employerId === id);

export const roleProjects = (roleId: string) =>
  projects.filter((p) => p.roleId === roleId);

/** A skill that some role matches without any of its matches being highlights. */
export function skillWithNonHighlightRole(): { skill: string; roleId: string } {
  for (const skill of skills) {
    for (const employer of employers) {
      for (const role of employer.roles) {
        const matching = role.projects.filter((p) => p.skills.includes(skill));
        if (matching.length > 0 && matching.every((p) => !p.highlight)) {
          return { skill, roleId: role.id };
        }
      }
    }
  }
  throw new Error('No such skill/role pair in content.json');
}
