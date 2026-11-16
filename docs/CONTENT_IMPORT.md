# WordPress to Astro migration progress

## Completed
- [x] Export WordPress content: `franziskazimmer.WordPress.2026-11-16.xml`.
- [x] Inspect backup media ZIP and exclude WordPress cache, JSON, log, PHP, and settings files.
- [x] Import **15 published pages** (5 each in EN, DE, JA), and **144 published EN posts** into `src/data/import-*.json`.
- [x] Exclude **3 private pages**.
- [x] Build Astro page routes for original public WordPress URLs.
- [x] Add multilingual navigation and equivalents for Home/About/Research/Contact/Privacy.
- [x] Add canonical tags, sitemap, robots.txt, blog index, and custom 404.
- [x] Add a secure, one-time media import workflow.

## Required before DNS cutover
- [ ] Upload only `franziska-public-media.zip` from the ChatGPT conversation to the repository, with GitHub filename `migration-media.zip`.
- [ ] Run `Import vetted WordPress media (one-time)` in Actions.
- [ ] Confirm GitHub Pages source is set to **GitHub Actions**.
- [ ] Verify `Deploy Astro to GitHub Pages` build completes and site works.
- [ ] Compare the 15 imported static pages with the WordPress site; Elementor/shortcode styling will not transfer exactly.
- [ ] Review article permalinks, navigation, 404, sitemap, structured metadata, SEO and internal links.
- [ ] Verify all 10 selected images load on the GitHub Pages deployment.
- [ ] Replace WordPress SureForms contact form with an appropriate static-compatible form or verified contact link.
- [ ] Check external embeds for availability and privacy implications.
- [ ] Verify custom domain and SSL; only then change Cloudflare DNS.
- [ ] Preserve DNS MX/SPF/DKIM/DMARC records and any services depending on Sakura.
- [ ] Retain Sakura and private backups until migration is verified.

## Media ZIP content

Selected 10 published media assets referenced by the exported public pages, including favicon. Original archive remains private; public ZIP contains only selected JPG/PNG/JPEG files.

## Notes

WordPress PHP, plugins, admin backend, comment handling, and forms are not provided by GitHub Pages. Static page content may contain older CSS and external URLs that require visual review. Links to URLs not present in the WordPress export need separate review. All edits are being made to the repository; no production DNS change has been made.
