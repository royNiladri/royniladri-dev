# Images

Drop files in with these exact names and the site picks them up on the next
build. Until a file exists, the component draws the hatched placeholder from
the design instead — nothing breaks, nothing 404s.

| Path                    | What it is                         | Supply at least |
| ----------------------- | ---------------------------------- | --------------- |
| `portrait.jpg`          | Nav avatar, drawn as a 36px circle | 72×72, square   |
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

## Logos

Logos are drawn with `object-fit: contain`, so a wide logo sits inside its tile
instead of being cropped to its middle. Two things to check in an SVG:

- **It needs a `viewBox`.** Without one the file cannot scale.
- **No baked-in background rectangle.** A white rect behind the mark shows as a
  white block, which is obvious in dark mode.

Auto-traced SVGs (VTracer, Illustrator image trace) have both problems and
wobbly edges besides. Prefer the vendor's official SVG where you can get it.

Paths are configured in `src/content/content.json` (`profile.portrait`,
`profile.heroPhoto`, `photography.photos`, and `logo` on each employer) and are
written as `/images/...`, which resolves to this folder.

`public/resume.pdf` is still expected for the resume link — that one is a
download, not an image, so it belongs in `public/`.
