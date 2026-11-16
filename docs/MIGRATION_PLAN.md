# Migration: WordPress / Sakura → Astro / GitHub Pages

**Status:** Planning. Production unchanged.
**Current:** Cloudflare domain + Sakura WordPress.
**Target:** Cloudflare DNS + GitHub Pages + Astro static website, managed via GitHub Copilot.
**Constraints:** No separate staging site required; downtime acceptable; preserve English/German/Japanese content and existing URLs when practical.

## Tasks
- [x] Create dedicated repository.
- [ ] Back up WordPress XML, database, uploads/media, theme and configuration. Do not commit credentials or database dumps containing personal data to a public repository.
- [ ] Inventory all existing pages, languages, media, URLs and contact-form behavior.
- [ ] Rebuild the website as a responsive, accessible Astro static site, preserving actual content without inventing publications or biography.
- [ ] Add SEO metadata, canonical/hreflang, sitemap, 404 and redirects or compatible legacy paths.
- [ ] Configure GitHub Actions → GitHub Pages deployment.
- [ ] Configure custom domain franziska-zimmer.com in GitHub Pages.
- [ ] Update Cloudflare DNS: apex A records 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153; www CNAME GYF-256.github.io. Preserve email DNS records; check for conflicting AAAA/A/CNAME.
- [ ] Verify production HTTPS, navigation, mobile, language routes, images, contact method, redirects.
- [ ] Cancel Sakura only after confirming no email or other services depend on it and retaining backups.

## Copilot implementation brief
Implement an Astro static site in this repository. Preserve the current public website's structure and design where feasible. Do not claim access to missing WordPress exports or media. Document missing content and request assets as needed. Use minimal JS, no PHP/database, and create a pull request for review. Do not change DNS or cancel services.

Previous planning record: https://github.com/GYF-256/kurabetter-development/issues/2
