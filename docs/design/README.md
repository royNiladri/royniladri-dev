# Handoff: Niladri Roy — Portfolio (rebuild from scratch)

## Overview
A human-facing portfolio that supports (not replaces) an ATS-tuned resume. Audience: hiring managers, tech leads, HR, occasional freelance clients. Must deploy statically to GitHub Pages — no database, no API, no server.

The chosen direction is **Round 2 (options 2a, 2b, 2c)** in `Portfolio Directions.dc.html`. Round 1 (1a/1b/1c) is historical exploration — ignore it except as context.

## About the Design Files
`Portfolio Directions.dc.html` is a **design reference built in HTML**, not production code. Open it in a browser (keep `support.js` next to it) to see the intended look and interact with the work-history prototype. Recreate it in a fresh repo using the stack below — do not ship the HTML file.

`content.json` holds all the real content extracted from the mockup, in the shape the site should consume. It is the single source of truth: adding a new employer = adding one entry to `employers[]`.

## Recommended stack
- **Astro** (static output) + TypeScript. Content in `src/content/content.json` (+ Markdown for long-form case studies in `src/content/stories/*.md` via Astro content collections).
- Interactivity (work-history filters, Highlights/Everything, expand/collapse, theme toggle) as a small island — vanilla TS or Preact. Everything else renders to static HTML.
- Plain CSS with custom properties (tokens below). No CSS framework needed.
- Deploy: GitHub Actions → GitHub Pages (`withastro/action` + `actions/deploy-pages`). Custom domain `info.royniladri.dev` via `public/CNAME`.
- Work history should be fully readable with JS disabled (render everything open; JS progressively collapses).

Suggested structure:
```
src/
  content/content.json
  content/stories/<slug>.md
  layouts/Base.astro          # nav, footer, theme toggle, fonts
  pages/index.astro           # 2a
  pages/work.astro            # 2b
  pages/stories/[slug].astro  # 2c
  components/WorkHistory.tsx  # interactive island
  components/TechChip.astro
  styles/tokens.css
public/images/…  public/resume.pdf  public/CNAME
```

## Fidelity
**High-fidelity** for layout, type, color and interaction. Copy text is draft — the owner will edit it; testimonials and photos are placeholders.

## Screens

### 1. Home (`/`) — option 2a
Max content width 1280px, horizontal padding 64px (20px on mobile).
1. **Nav** — 22px vertical padding. Left: 36px circular avatar + "Niladri Roy" (Literata 600 18px). Right: Work · Stories · Self-hosted · Writing · Contact (Nunito Sans 15px, `--mute`; active = `--ink` 700) + theme toggle button (card bg, radius 10px, 13px).
2. **Hero photo** — full-width inside padding, 380px tall, radius 24px. Owner's landscape photograph.
3. **Intro card** — overlaps the photo by −110px, inset 128px left / 64px right; `--card` bg, radius 24px, padding 44px 52px, shadow `0 20px 50px -30px rgba(40,30,20,.35)`. Grid `1fr 260px`, gap 56px.
   - H1 Literata 400 50px/1.1, letter-spacing −.015em; second sentence italic in `--acc`.
   - Intro paragraph 18px/1.65, max 58ch.
   - Right column (left border `--line`, padding-left 32px): "RIGHT NOW" label (13px 700, .06em, uppercase, `--mute`), title (Literata 600 18px), org line (15px mute), **status badge** (soft bg, radius 10px, 8px dot in `--acc`, 14px 600). Status is a config value from `content.json → profile.status`.
4. **Stories from the work** — H2 Literata 400 36px + "All work history →" link (15px 700 `--acc`). 2-column grid, gap 24px. Card: `--card`, radius 20px, padding 32px. No screenshots (proprietary work). Contents: org label (13px 700 uppercase mute), title (Literata 400 27px), metric right-aligned (Literata 400 40px **`--acc2`**) + label (13px mute, max 160px), summary (16px/1.55 mute), divider, "LAYERS IT TOUCHED" + layer tags (13px 600, `--soft` bg, radius 8px, padding 5px 10px). Links to `/stories/<slug>`.
5. **How I like to work** — grid `320px 1fr`, gap 64px. Principles: italic numeral (Literata 28px `--acc`) + title (Literata 600 21px) + body (16px/1.6 mute).
6. **Testimonials** — 2 columns, `--soft` bg cards, radius 20px, padding 36px, quote Literata italic 21px/1.5.
7. **What I self-host** — full-bleed `--card` band, padding 72px 64px.
   - Top grid `320px 1fr`: intro (H2 + paragraph) | 2×2 group cards (1px `--line` border, radius 16px, padding 20px 22px). Each group: uppercase label, then services: 28px icon tile (`--soft`, radius 8px, 15px mono icon; fallback = initial letter) + name (Literata 600 17px) + description (14px mute).
   - **Backup chain** row under a top border: node boxes (flex 1, `--bg`, 1px border, radius 14px) alternating with edge connectors (max 190px): label in JetBrains Mono 600 12px `--acc`, 1px `--acc` line with arrowhead, caption 12px mute. Header right: "Three copies, two locations, one offsite".
   - Mobile: stack groups 1-column; backup chain goes vertical (arrows point down).
8. **Through my lens** — 4 photos, grid `2fr 1fr 1fr 1.4fr`, 240px tall, radius 16px; Instagram link.
9. **Writing & teaching / Education** — two columns of list items with bottom borders.
10. **Footer CTA** — `--acc` bg, white text, radius 24px, padding 52px 56px; "Say hello" (Literata 38px) + link pills (rgba(255,255,255,.16), radius 12px).

### 2. Work history (`/work`) — option 2b
- Header: H1 "Where I've worked" (Literata 400 52px) + explainer + **live count line** (14px 700 `--acc`, e.g. "Showing 11 highlights of 20 projects tagged AI/ML."). Right: segmented **Highlights / Everything** (card bg, radius 12px, 4px pad; active = `--acc` bg white 700).
- Body grid `260px 1fr`, gap 48px.
- **Left rail (sticky, top 16px)**: "EMPLOYERS" → "All employers" + one row per employer (32px logo tile, name Literata 600 17px, years 13px). Scales to any number of employers. Below: "FILTER BY SKILL" chips (radius 9px, 13px; active `--acc`/white). Below: "Download resume (PDF) →".
- **Main**: one section per employer (newest first): name (Literata 38px), note, tenure right-aligned. Then roles as a timeline: date/location column 150px | content with 2px left rule and 12px ring dot in `--acc`. Role: title (Literata 600 23px), team, **toggle button** (card bg, `--acc` text, radius 10px), one-line summary (16px/1.6).
  - **Collapsed**: highlight titles as chips (`--soft2` bg, ★ in `--acc2`, Literata italic 15px).
  - **Expanded**: project cards (white, 1px border, radius 16px, padding 20px 22px): title (Literata 600 18px), "★ HIGHLIGHT" badge (11px 700 uppercase `--acc2`), description (15px/1.6), skills in italic mute, **tech chips with mono icons** (JetBrains Mono 11px, `--soft`, radius 6px, 12px icon), optional external link.
- **Mobile (390)**: rail becomes horizontal scroll of employer buttons (min-height 40px); roles are tap-to-expand rows (min 44px); tech shown as a "·"-joined mono line.

### 3. Case study (`/stories/[slug]`) — option 2c
Grid `1fr 300px`, gap 72px. Main (max 720px): breadcrumb, H1 Literata 54px, italic subtitle 22px mute, 3 metric tiles (first metric in `--acc2`), sections (H2 Literata 600 24px + 18px/1.7 body) from Markdown: Context / What I did / The hard part / Outcome, plus a simplified flow diagram made of text boxes (no proprietary visuals). Sticky aside: My role, Skills, Tech chips, "See it in the work history →", "Next story →".

## Interactions & state (Work history island)
State: `view: 'hi' | 'all'`, `filter: skill | 'All'`, `employer: id | 'all'`, `openHi: Set<roleId>`, `closedAll: Set<roleId>`.
- **Highlights**: roles closed by default; opening shows only highlight projects, plus a dashed "+ N more in Everything" button that switches view.
- **Everything**: every role open by default showing all projects; user can collapse individually.
- **Skill filter**: hide roles with zero matching projects, and hide employers with no remaining roles (rail stays complete). If a role has matches but none are highlights (in Highlights view), its toggle reads "See N in Everything" and switches view.
- Toggle label: "+ Show N highlights/projects" / "− Collapse".
- Sync `view`, `filter`, `employer` to the URL query string (shareable links, e.g. `/work?skill=AI/ML&view=all`).
- **Theme**: light default; toggle persists in `localStorage`; respect `prefers-color-scheme` only if no saved choice. Set `data-theme` on `<html>` before paint (inline script) to avoid flash.

## Design tokens
Fonts (Google Fonts, or self-host via `@fontsource`): **Literata** (serif headings, 400/600, italic 400), **Nunito Sans** (UI/body 400/600/700), **JetBrains Mono** (tech chips, 400/500/600).

Light:
```
--bg:    oklch(0.972 0.004 230)   /* ≈ #f3f5f7 */
--card:  #ffffff
--ink:   #1b1f24
--mute:  #56606b
--line:  #e2e6ea
--acc:   oklch(0.47 0.08 200)     /* deep teal, primary */
--soft:  oklch(0.95 0.018 200)
--acc2:  oklch(0.55 0.13 45)      /* amber-rust, secondary — highlights & metrics only */
--soft2: oklch(0.95 0.03 60)
```
Dark:
```
--bg:#121417 --card:#1a1d21 --ink:#e8eaed --mute:#9aa3ad --line:#2a2f35
--acc:oklch(0.76 0.09 200) --soft:oklch(0.3 0.04 200)
--acc2:oklch(0.8 0.12 60)  --soft2:oklch(0.32 0.05 55)
```
Secondary color rule: `--acc2` is used **only** for highlight stars/badges and headline metrics. Everything else uses `--acc`.

Radii: 6 (chips) · 8–10 (tags, buttons) · 12–16 (tiles, project cards) · 20 (story cards) · 24 (hero, intro card, footer).
Spacing: section vertical padding 72–96px; page gutter 64px desktop / 20px mobile; common gaps 6, 12, 16, 24, 28, 48, 64.

## Assets
- Tech & service icons: Simple Icons (`https://cdn.simpleicons.org/<slug>/<hex>`), monochrome in `--mute` hex. For production prefer the `simple-icons` npm package and inline SVGs at build time (no runtime CDN, and `currentColor` makes theming free). Slug map in `content.json → techIcons`; self-hosted services carry `icon` slugs. Homebox has no Simple Icon → initial-letter fallback.
- Placeholders to supply: portrait, hero landscape photo, 4 photography samples, employer logos, `resume.pdf`, real testimonials (current ones are marked `placeholder: true`).

## Files
- `Portfolio Directions.dc.html` (+ `support.js`) — interactive design reference. Round 2 = the spec.
- `content.json` — all content, schema-ready.
