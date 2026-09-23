# royniladri.dev — portfolio

A static portfolio for Niladri Roy, built from the handoff in
[`docs/design/README.md`](docs/design/README.md) (Round 2: options 2a/2b/2c).
Astro, no framework runtime, no database, no API. Deploys to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve dist/ locally
npm run check    # astro check (types + template diagnostics)
npm test         # Playwright end-to-end tests
```

---

## Editing content

**Almost every change is an edit to one JSON file:
[`src/content/content.json`](src/content/content.json).** Nothing is hard-coded
in templates — the pages read from that file and lay out whatever they find.

| To do this | Edit this |
| --- | --- |
| Change the status badge | `profile.status` (allowed values in `profile.statusOptions`) |
| Change the headline / intro / current role | `profile.*` |
| **Add an employer** | one entry in `employers[]` — the rail, sections and counts all grow on their own |
| Add a role | a `roles[]` entry on that employer |
| Add a project | a `projects[]` entry on that role |
| Mark a project as a highlight | `"highlight": true` — it then shows in Highlights view and gets the ★ badge |
| Add a skill filter chip | one string in `skills[]` (must match the `skills` used on projects) |
| Add a self-hosted service | a `services[]` entry in the right `selfHosted.groups` entry |
| Add a backup hop | two entries in `selfHosted.backupChain`: an edge (`e`) then a node (`t`) |
| Add a tech icon | `techIcons["Display Name"] = "simple-icons-slug"` |
| Change writing / education / footer links | `writing[]`, `education[]`, `links[]` |

Ordering in the file is the ordering on the page. Employers are newest first.

### Case studies

A story is **two pieces**:

1. an entry in `content.json → caseStudies[]` — the card facts (title, org,
   headline metric, summary, layers), used on the home page and `/stories`;
2. `src/content/stories/<slug>.md` — the prose, with page-only extras in its
   frontmatter. The file name **must** match the `slug`.

```markdown
---
subtitle: 'Italic line under the title.'
metrics: # the two tiles after the headline metric
  - { value: '5 layers', label: 'UI to search index' }
flow: ['Record', 'Service', 'Index'] # text-box diagram; omit to hide it
flowCaption: 'How a record flows (simplified diagram)'
---

## Context
...
```

The aside (my role, skills, tech chips, "See it in the work history →") is
**derived**, not written twice: set `"caseStudy": "<slug>"` on the matching
project in `content.json` and the story picks up that project's role, employer,
skills and tech. Build fails loudly if a story has no matching `caseStudies`
entry.

> The four story bodies currently in the repo are **drafts** written from the
> project descriptions — they are meant to be rewritten in the owner's voice.

### Images

See [`public/images/README.md`](public/images/README.md). Until a file exists,
components draw the hatched placeholder from the design instead of a broken
image, so the site always builds. Still to supply: `hero.jpg`, `photos/1–4.jpg`,
`logos/*.svg`, and `public/resume.pdf`. (`portrait.jpg` is in place.)

---

## How it is put together

```
src/
  content/content.json        the single source of truth
  content/stories/*.md        long-form case studies
  content.config.ts           schema for the story frontmatter
  lib/content.ts              the only module that reads content.json
  lib/types.ts                types for that file's shape
  lib/icons.ts                Simple Icons, inlined at build time
  lib/assets.ts               "has this image been supplied yet?"
  layouts/Base.astro          head, fonts, theme bootstrap, nav, contact footer
  pages/index.astro           home
  pages/work.astro            work history
  pages/stories/index.astro   story index
  pages/stories/[slug].astro  one story
  components/                 home + shared components
  components/work/            rail, employer section, role, project card
  scripts/work-history.ts     the only real client-side logic
  scripts/theme.ts            light/dark toggle
  styles/tokens.css           every colour, radius and spacing step
  styles/base.css             reset and shared primitives
```

Each component owns its own scoped CSS, so a component's markup and styling live
in one file and nothing leaks.

**Design tokens.** Colours, fonts, radii and spacing are custom properties in
`styles/tokens.css`. Dark mode overrides only colours. One rule worth keeping:
`--acc2` (amber-rust) is for highlight stars/badges and headline metrics only;
everything else uses `--acc`.

**JavaScript.** Two small modules, no UI framework:

- `work-history.ts` — filtering and expand/collapse on `/work`.
- `theme.ts` — the light/dark toggle (an inline script in `Base.astro` applies
  the saved theme before first paint, so there is no flash).

The work history **renders every employer, role and project as static HTML with
everything expanded**. JavaScript then collapses it. With JS disabled the page is
still complete and readable; only the filters disappear. State is mirrored to the
URL, so `/work?employer=inf&skill=AI%2FML&view=all` is shareable, and story pages
deep-link into it with `#role-<id>`.

**Icons** come from the `simple-icons` npm package and are inlined as SVG at
build time — no CDN request at runtime, and `currentColor` means they theme
themselves. A slug with no icon falls back to the service's initial letter.

**Fonts** are Literata, Nunito Sans and JetBrains Mono from Google Fonts, linked
in `Base.astro`. To self-host instead, install the matching `@fontsource`
packages and swap that one `<link>` for imports.


---

## Testing

End-to-end tests run in a real browser with [Playwright](https://playwright.dev),
against the **production build** rather than the dev server, so what is tested is
what ships. `playwright.config.ts` builds and serves the site automatically.

```bash
npm test               # everything, headless
npm run test:ui        # interactive runner, good for writing tests
npm run test:headed    # watch it click through a visible browser
npm run test:report    # open the HTML report from the last run
npx playwright test e2e/work.spec.ts          # one file
npx playwright test --project=mobile          # just the phone layout
npx playwright test -g "backup chain"         # by name
```

First run on a new machine needs the browser once: `npx playwright install chromium`.

| Spec | What it covers |
| --- | --- |
| `e2e/work.spec.ts` | The work-history island: Highlights vs Everything, expand/collapse, "+ N more", skill and employer filters, the empty state, and URL round-tripping (including junk query strings). |
| `e2e/home.spec.ts` | Hero, story cards, the self-hosted grid and backup chain, nav, the icon fallback, and that no request 404s. |
| `e2e/stories.spec.ts` | Story index, every story page, the derived aside, next-story chaining, and the deep link into the work history. |
| `e2e/theme.spec.ts` | Light default, toggling, persistence across pages and reloads, `prefers-color-scheme`, no flash before paint, and blocked `localStorage`. |
| `e2e/no-js.spec.ts` | With JavaScript disabled: every project renders open, and controls that would do nothing are hidden. |
| `e2e/layout.spec.ts` | Desktop gutters, no sideways scroll, no console errors, the 1280px measure. |
| `e2e/layout.mobile.spec.ts` | Phone layout at 393px: scrolling rail, tap targets, collapsed tech chips, vertical backup chain. |

Expectations are **derived from `content.json`** via `e2e/helpers/content.ts`
(counts, employer ids, which role has matches but no highlights). Adding a
project or an employer does not break the suite — only changing behaviour does.

Two projects run: `desktop` (1280×900) over everything except `*.mobile.spec.ts`,
and `mobile` (Pixel 5) over only those. CI runs both on every pull request and
uploads the HTML report.

---

## Deploying

Push to `master`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds with `withastro/action` and publishes with `actions/deploy-pages`.
Pull requests get a build, a type check and the Playwright suite from
`build.yml`.

Two settings this depends on, both in the repo's GitHub settings:

1. **Pages → Build and deployment → Source** must be **GitHub Actions**
   (the previous setup published to a `gh-pages` branch).
2. **Pages → Custom domain** must be `info.royniladri.dev`, with a DNS `CNAME`
   record for `info` pointing at `royniladri.github.io`.

The domain lives in two places that must agree: `public/CNAME` and `site` in
`astro.config.mjs` (used for canonical URLs and the sitemap).
