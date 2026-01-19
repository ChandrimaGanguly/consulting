import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chandrimaganguly.github.io',
  base: '/consulting',
  integrations: [tailwind()],
  output: 'static',
});
