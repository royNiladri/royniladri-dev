/**
 * The shape of `src/content/content.json`.
 *
 * Adding an employer, role or project means editing that JSON file only —
 * these types keep the templates honest about what is available.
 */

export interface Link {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  skills: string[];
  tech: string[];
  highlight: boolean;
  /** Slug of a long-form story in `src/content/stories/`, or null. */
  caseStudy: string | null;
  link?: Link;
}

export interface Role {
  id: string;
  title: string;
  /** Short form shown in the rail, e.g. "2024 — 26". */
  yr: string;
  team: string;
  loc: string;
  /** Long form shown on the timeline, e.g. "Apr 2024 — Jan 2026". */
  dates: string;
  summary: string;
  projects: Project[];
}

export interface Employer {
  id: string;
  name: string;
  years: string;
  tenure: string;
  note: string;
  roles: Role[];
  years_numeric: number;
  logo: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  org: string;
  metric: string;
  metricLabel: string;
  summary: string;
  layers: string[];
}

export interface Principle {
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  placeholder?: boolean;
}

export interface Service {
  name: string;
  /** Simple Icons slug, or null for the initial-letter fallback. */
  icon: string | null;
  description: string;
}

export interface ServiceGroup {
  group: string;
  services: Service[];
}

/** A step in the backup chain: either a node (`t`) or an edge (`e`). */
export interface ChainStep {
  /** Node title. */
  t?: string;
  /** Edge label. */
  e?: string;
  /** Supporting line, used by both kinds. */
  s: string;
  /** Node icon slug. */
  i?: string | null;
}

export interface Profile {
  name: string;
  headline: string;
  intro: string;
  current: { title: string; org: string; team: string; location: string };
  status: string;
  statusOptions: string[];
  resumeUrl: string;
  portrait: string;
  heroPhoto: string;
}

export interface SiteContent {
  profile: Profile;
  skills: string[];
  employers: Employer[];
  caseStudies: CaseStudy[];
  principles: Principle[];
  testimonials: Testimonial[];
  selfHosted: {
    intro: string;
    groups: ServiceGroup[];
    backupChain: ChainStep[];
  };
  photography: { instagram: string; photos: string[] };
  writing: { title: string; description: string; url: string }[];
  education: { degree: string; school: string; years: string; note: string }[];
  links: Link[];
  /** Display name → Simple Icons slug. */
  techIcons: Record<string, string>;
}
