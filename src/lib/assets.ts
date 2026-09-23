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
import { fileURLToPath } from 'node:url';

const publicDir = new URL('../../public/', import.meta.url);

export function hasAsset(path: string | null | undefined): boolean {
  if (!path) return false;
  if (/^https?:\/\//.test(path)) return true;
  const rel = path.replace(/^\/+/, '');
  try {
    return existsSync(fileURLToPath(new URL(rel, publicDir)));
  } catch {
    return false;
  }
}
