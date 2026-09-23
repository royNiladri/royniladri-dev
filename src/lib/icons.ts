/**
 * Simple Icons, inlined at build time.
 *
 * The npm package is a build-time dependency only: nothing is fetched from a
 * CDN at runtime, and because the path is rendered as an inline <svg> it picks
 * up `currentColor`, so theming is free.
 *
 * Slugs come from `content.json → techIcons` (tech) and the `icon` field on
 * self-hosted services. A slug with no matching icon falls back to the
 * service's initial letter — Homebox, for example.
 */

import * as simpleIcons from 'simple-icons';

export interface Icon {
  title: string;
  /** The `d` attribute of a single 24×24 path. */
  path: string;
}

type IconMap = Record<string, { title: string; path: string } | undefined>;

const icons = simpleIcons as unknown as IconMap;

/** `react` → `siReact`. Returns undefined for unknown slugs. */
export function iconBySlug(slug: string | null | undefined): Icon | null {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = icons[key];
  return icon ? { title: icon.title, path: icon.path } : null;
}

/** Look up an icon by display name using the techIcons map in content.json. */
export function iconByTech(
  name: string,
  techIcons: Record<string, string>,
): Icon | null {
  return iconBySlug(techIcons[name]);
}
