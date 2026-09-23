# Images

Drop files in with these exact names and the site picks them up on the next
build. Until a file exists, the component draws the hatched placeholder from
the design instead — nothing breaks, nothing 404s.

| Path                    | What it is                         | Supply at least |
| ----------------------- | ---------------------------------- | --------------- |
| `portrait.jpg`          | Nav avatar, drawn as a 56px circle | 112×112, square |
| `hero.jpg`              | Home hero band                     | 2304 wide       |
| `photos/1–4.jpg`        | "Through my lens" strip            | 960 wide        |
| `logos/sf.svg` etc.     | Employer logos, 32px tile          | SVG, or 64×64   |

## Why this folder and not `public/`

Files here go through Astro's image pipeline: resized at build time to the size
they are actually drawn at, emitted at 1x and 2x, and re-encoded to WebP. The
portrait is a good illustration — a 1440×1352 JPEG painted into a 36px circle
went from **257 KB to 1.8 KB**, and stopped aliasing, because the browser is no
longer downscaling it by 40× in one step.

Supply generously sized originals and let the build shrink them. Anything in
`public/` is served byte-for-byte with no processing, which is why only `CNAME`,
`favicon.svg` and `robots.txt` live there.

## Where to get logos

[brandfetch.com](https://brandfetch.com/) has most companies' official assets.
Search the company, then **prefer the SVG** over PNG or JPEG — it stays sharp at
any size and usually has a transparent background.

Avoid the JPEG downloads. JPEG cannot store transparency, so the logo arrives
welded to a white rectangle, which shows as a white block on a dark background.
`logos/infa.jpeg` is an example: it works because the tile is white, but an SVG
would be smaller and cleaner.

Logos are drawn on a white tile with 4px of padding. Brand colours nearly always
assume a light background — Visa's dark blue is invisible on a dark page
otherwise — and it makes logos of different shapes and provenance sit together
consistently.

## What to check in a logo SVG

Logos are drawn with `object-fit: contain`, so a wide logo sits inside its tile
instead of being cropped to its middle. Two things to check:

- **It needs a `viewBox`.** Without one the file cannot scale.
- **No baked-in background rectangle.** A white rect behind the mark shows as a
  white block, which is obvious in dark mode.

Auto-traced SVGs (VTracer, Illustrator image trace) have both problems and
wobbly edges besides. Prefer the vendor's official SVG where you can get it.

## The portrait

Crop it **tight to the face** — head and shoulders, square — before dropping it
in. It is drawn as a 56px circle, so a half-body shot leaves the face at a
quarter of that and unrecognisable. The size lives in `--avatar` in
`src/styles/tokens.css` if you want to change it; keep the `width` passed to
`<Media>` in `Nav.astro` in step so the 2x variant stays honest.

Paths are configured in `src/content/content.json` (`profile.portrait`,
`profile.heroPhoto`, `photography.photos`, and `logo` on each employer) and are
written as `/images/...`, which resolves to this folder.

`public/resume.pdf` is still expected for the resume link — that one is a
download, not an image, so it belongs in `public/`.
