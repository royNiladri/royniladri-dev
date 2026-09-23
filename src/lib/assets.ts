/**
 * Build-time check for whether an image has actually been dropped into
 * `public/` yet.
 *
 * The design ships with placeholder hatching where the owner's photographs and
 * employer logos will go. Rather than committing fake binaries, components ask
 * this helper: if the file exists it is rendered as an <img>, otherwise the
 * hatched placeholder from the mockup is drawn instead. Adding the real file is
 * the only step needed to switch over.
 *
 * Runs on the server during `astro build` — never shipped to the browser.
 */

import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * Resolved against the working directory rather than `import.meta.url`: the
 * build bundles this module into a chunk somewhere else, so a path relative to
 * the source file points at the wrong place. Astro always runs from the
 * project root.
 */
const publicDir = resolve(process.cwd(), 'public');

export function hasAsset(path: string | null | undefined): boolean {
  if (!path) return false;
  if (/^https?:\/\//.test(path)) return true;
  const rel = path.replace(/^\/+/, '').split('/').filter(Boolean);
  if (rel.some((segment) => segment === '..')) return false;
  try {
    return existsSync(join(publicDir, ...rel));
  } catch {
    return false;
  }
}
