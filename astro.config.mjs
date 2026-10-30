import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://没用的功能.肏.top',
  integrations: [sitemap()],
  output: 'static'
});
