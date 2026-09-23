/**
 * Checks content.json against everything that consumes it: the skill filters,
 * the icon map, the story files, and the derived story asides.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import * as simpleIcons from 'simple-icons';

const raw = readFileSync('src/content/content.json', 'utf8');
const c = JSON.parse(raw);

const errors = [];
const warnings = [];
const notes = [];

const iconExists = (slug) =>
  Boolean(simpleIcons[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`]);

const projects = c.employers.flatMap((e) =>
  e.roles.flatMap((r) =>
    r.projects.map((p) => ({ ...p, employer: e.name, employerId: e.id, roleId: r.id })),
  ),
);

// --- ids -------------------------------------------------------------------
const empIds = c.employers.map((e) => e.id);
const roleIds = c.employers.flatMap((e) => e.roles.map((r) => r.id));
for (const [label, ids] of [['employer', empIds], ['role', roleIds]]) {
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) errors.push(`Duplicate ${label} id(s): ${[...new Set(dupes)].join(', ')}`);
}

// --- skills ----------------------------------------------------------------
const declared = new Set(c.skills);
const used = new Set(projects.flatMap((p) => p.skills));
for (const s of used) {
  if (!declared.has(s)) {
    errors.push(`Skill "${s}" is used by a project but missing from skills[] — it gets no filter chip, and filtering can never surface that project.`);
  }
}
for (const s of declared) {
  if (!used.has(s)) warnings.push(`Skill "${s}" has a filter chip but no project uses it — the chip always yields an empty result.`);
}

// --- tech + icons ----------------------------------------------------------
const usedTech = new Set(projects.flatMap((p) => p.tech));
for (const t of usedTech) {
  const slug = c.techIcons[t];
  if (!slug) warnings.push(`Tech "${t}" has no techIcons entry — the chip renders with an initial-letter fallback.`);
  else if (!iconExists(slug)) errors.push(`techIcons["${t}"] = "${slug}" is not a Simple Icons slug.`);
}
for (const [name, slug] of Object.entries(c.techIcons)) {
  if (!usedTech.has(name)) notes.push(`techIcons["${name}"] is mapped but unused.`);
  else if (!iconExists(slug)) errors.push(`techIcons["${name}"] = "${slug}" is not a Simple Icons slug.`);
}

// --- self-hosted icons -----------------------------------------------------
for (const g of c.selfHosted.groups) {
  for (const s of g.services) {
    if (s.icon && !iconExists(s.icon)) {
      errors.push(`selfHosted "${s.name}" icon "${s.icon}" is not a Simple Icons slug.`);
    }
    if (!s.icon) notes.push(`selfHosted "${s.name}" has no icon — falls back to "${s.name.charAt(0)}".`);
  }
}
for (const step of c.selfHosted.backupChain) {
  if (step.i && !iconExists(step.i)) {
    errors.push(`backupChain "${step.t}" icon "${step.i}" is not a Simple Icons slug.`);
  }
}
const nodes = c.selfHosted.backupChain.filter((s) => s.t).length;
const edges = c.selfHosted.backupChain.filter((s) => s.e).length;
if (nodes !== edges + 1) {
  warnings.push(`Backup chain has ${nodes} nodes and ${edges} edges; a chain should alternate node/edge/node (edges = nodes - 1).`);
}

// --- stories ---------------------------------------------------------------
const storyDir = 'src/content/stories';
const files = readdirSync(storyDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
const slugs = c.caseStudies.map((s) => s.slug);

for (const slug of slugs) {
  if (!files.includes(slug)) errors.push(`caseStudies entry "${slug}" has no ${storyDir}/${slug}.md — the build fails.`);
}
for (const f of files) {
  if (!slugs.includes(f)) errors.push(`${storyDir}/${f}.md has no caseStudies entry in content.json — the build fails.`);
}

const linked = projects.filter((p) => p.caseStudy);
for (const p of linked) {
  if (!slugs.includes(p.caseStudy)) {
    errors.push(`Project "${p.title}" links to caseStudy "${p.caseStudy}", which is not in caseStudies[].`);
  }
}
for (const slug of slugs) {
  const owners = linked.filter((p) => p.caseStudy === slug);
  if (owners.length === 0) {
    warnings.push(`Story "${slug}" has no project pointing at it (no project with "caseStudy": "${slug}"), so its page loses the whole sidebar: My role, Skills, Tech and the "See it in the work history" link. Nothing links to it from /work either.`);
  } else if (owners.length > 1) {
    warnings.push(`Story "${slug}" is claimed by ${owners.length} projects; the first one wins.`);
  }
}

// --- profile / misc --------------------------------------------------------
if (!c.profile.statusOptions.includes(c.profile.status)) {
  warnings.push(`profile.status "${c.profile.status}" is not one of statusOptions.`);
}

const stray = c.caseStudies.filter((s) => 'body_markdown_file' in s);
if (stray.length) {
  notes.push(`${stray.length} caseStudies entries carry "body_markdown_file". Nothing reads it — the body is always src/content/stories/<slug>.md. Harmless, but it implies a setting that does not exist.`);
}

// --- assets ----------------------------------------------------------------
const assets = [
  ['profile.portrait', c.profile.portrait],
  ['profile.heroPhoto', c.profile.heroPhoto],
  ['profile.resumeUrl', c.profile.resumeUrl],
  ...c.photography.photos.map((p, i) => [`photography.photos[${i}]`, p]),
  ...c.employers.map((e) => [`${e.name} logo`, e.logo]),
];
const missing = assets.filter(([, p]) => p && !existsSync('public' + p));
if (missing.length) {
  notes.push(`${missing.length} asset(s) not supplied yet (placeholder shown): ${missing.map(([k]) => k).join(', ')}`);
}

if (!raw.endsWith('\n')) notes.push('File has no trailing newline.');

// --- report ----------------------------------------------------------------
const section = (title, items, bullet) => {
  if (!items.length) return;
  console.log(`\n${title}`);
  for (const i of items) console.log(`  ${bullet} ${i}`);
};

console.log(`content.json: ${c.employers.length} employers, ${roleIds.length} roles, ${projects.length} projects (${projects.filter((p) => p.highlight).length} highlights), ${c.caseStudies.length} stories`);
section('ERRORS', errors, '✗');
section('WARNINGS', warnings, '!');
section('NOTES', notes, '·');
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s), ${notes.length} note(s)`);
process.exit(errors.length ? 1 : 0);
