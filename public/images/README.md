# Images

Drop files in with these exact names and the site picks them up on the next
build. Until a file exists, the component draws the hatched placeholder from the
design instead — nothing breaks, nothing 404s.

| Path                        | What it is                          | Suggested size     |
| --------------------------- | ----------------------------------- | ------------------ |
| `portrait.jpg`              | Nav avatar, shown as a 36px circle  | 200×200, square    |
| `hero.jpg`                  | Home hero band                      | 2400×760, landscape |
| `photos/1–4.jpg`            | "Through my lens" strip             | ~1200×900          |
| `logos/sf.svg`, `inf.svg`, `visa.svg` | Employer logos in the work rail | 64×64, square   |

Paths are configured in `src/content/content.json` (`profile.portrait`,
`profile.heroPhoto`, `photography.photos`, and `logo` on each employer), so a
different name or format only needs an edit there.

Also expected: `public/resume.pdf` for the "Download resume (PDF)" link.
