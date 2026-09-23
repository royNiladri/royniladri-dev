// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output for GitHub Pages. `site` is the canonical origin, used for
// sitemap/canonical URLs — update it together with public/CNAME.
export default defineConfig({
  site: 'https://info.royniladri.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
