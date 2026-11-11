// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Docelowa domena – potrzebna do sitemap, canonical i Open Graph.
  site: 'https://www.tomka.pl',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  // Całą stronę generujemy statycznie (najlepsza wydajność, darmowy hosting).
  output: 'static',
  // CSS (~10 kB gzip) wstawiamy bezpośrednio do HTML – brak blokujących żądań.
  build: { inlineStylesheets: 'always' },
  // Krótki prefetch linków wewnętrznych przy najechaniu kursorem.
  prefetch: { defaultStrategy: 'hover' },
});
