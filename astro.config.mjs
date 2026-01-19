import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chandrimaganguly.com',
  integrations: [tailwind()],
  output: 'static',
});
