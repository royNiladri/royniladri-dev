import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` re-exported from 'astro:content' is deprecated; astro/zod is the same
// instance Astro validates with, so schemas stay in step with the runtime.
import { z } from 'astro/zod';

/**
 * Long-form case studies.
 *
 * The card-level facts (title, org, headline metric, summary, layers) live in
 * `content.json → caseStudies` because they also render on the home page and
 * the stories index. A Markdown file here adds the page-only extras and the
 * prose. File name must match the slug in content.json.
 */
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    /** Italic line under the H1. */
    subtitle: z.string(),
    /** Two extra metric tiles; the first tile is the headline metric. */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(2)
      .default([]),
    /** Text-box flow diagram. Omit to hide the figure. */
    flow: z.array(z.string()).default([]),
    flowCaption: z.string().default('How it flows (simplified diagram)'),
  }),
});

export const collections = { stories };
