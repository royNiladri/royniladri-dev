/**
 * Theme state. Light is the default; the OS preference is only consulted when
 * the visitor has not chosen for themselves.
 *
 * The first paint is handled by a tiny inline script in `Base.astro` so the
 * page never flashes the wrong theme — this module only handles the toggle.
 */

export type Theme = 'light' | 'dark';

const KEY = 'theme';

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function nextTheme(): Theme {
  return readTheme() === 'dark' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme, { persist = false } = {}): void {
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* private mode, blocked storage — the theme still applies for this page */
    }
  }
}
