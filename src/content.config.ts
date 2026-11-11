/**
 * Kolekcje treści. „tips” = porady ogrodnika w plikach Markdown
 * (src/content/tips/*.md). Aby dodać poradę – skopiuj istniejący plik,
 * zmień frontmatter i treść.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tips' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Krótki opis na karcie (1–2 zdania). */
      summary: z.string(),
      /** Kolejność na stronie (rosnąco). */
      order: z.number(),
      /** Ścieżka względna do zdjęcia w src/assets/images. */
      image: image(),
      imageAlt: z.string(),
    }),
});

export const collections = { tips };
