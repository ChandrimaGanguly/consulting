import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://chandrimaganguly.github.io',
  base: '/consulting',
  integrations: [tailwind(), react()],
  output: 'static',
});
