/**
 * Image lookup.
 *
 * Images live in `src/assets/images/` rather than `public/` so that Astro
 * processes them at build time: resized to the size they are actually drawn
 * at, re-encoded, and emitted at 1x and 2x. A 1440px portrait painted into a
 * 36px circle is otherwise downscaled by the browser in one step, which
 * aliases badly and ships the full file to draw a thumbnail.
 *
 * content.json keeps writing paths as `/images/...`; they are resolved here.
 * A path with no file behind it returns null and the component draws the
 * design's placeholder instead, so the site always builds.
 */

import type { ImageMetadata } from 'astro';

const rasters = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true },
);

// SVG is already resolution-independent; it only needs a URL.
const vectors = import.meta.glob<string>('/src/assets/images/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

export type Resolved =
  | { kind: 'raster'; image: ImageMetadata }
  | { kind: 'vector'; url: string }
  | null;

function key(path: string): string {
  const clean = path.replace(/^\/+/, '').replace(/^images\//, '');
  return `/src/assets/images/${clean}`;
}

export function resolveImage(path: string | null | undefined): Resolved {
  if (!path) return null;

  const k = key(path);

  const raster = rasters[k];
  if (raster) return { kind: 'raster', image: raster.default };

  const vector = vectors[k];
  if (vector) return { kind: 'vector', url: vector };

  return null;
}

/** True when a real file backs this path. */
export function hasImage(path: string | null | undefined): boolean {
  return resolveImage(path) !== null;
}
