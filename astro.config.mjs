import { defineConfig } from 'astro/config';

// Preview on GitHub Pages project URL until Cloudflare DNS is switched.
// For the final custom domain, set PUBLIC_SITE_BASE=/ in the deployment workflow.
const base = process.env.PUBLIC_SITE_BASE || '/franziska-zimmer-com/';
export default defineConfig({
  site: 'https://gyf-256.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
});
