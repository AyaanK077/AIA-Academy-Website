import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// IMPORTANT: When you deploy, change `site` to your real domain
// (e.g. https://aia-alumni.netlify.app or a custom domain).
export default defineConfig({
  site: 'https://aia-academy-alumni.netlify.app',
  integrations: [tailwind()],
});
