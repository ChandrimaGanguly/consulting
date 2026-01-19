import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chandrimaganguly.github.io',
  base: '/AI_consultant_website',
  integrations: [tailwind()],
  output: 'static',
});
