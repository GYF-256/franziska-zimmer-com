# WordPress → Astro: status and verification

## Source inspection completed

- WordPress XML (2026-11-16): 215 export objects, including 144 published posts, 15 published pages, 3 private pages, and 16 media attachment records.
- Imported only the **159 public post/page records**. The three private pages are excluded.
- Published pages per locale: EN 5, DE 5, JA 5.
- All ten selected images (nine page assets and the favicon) were successfully committed to `public/wp-content/uploads/` by the automated import workflow. GitHub file existence was independently verified. The importer enforces exact SHA-256 hashes.
- Original WordPress permalinks are carried over; verified page equivalences are included as `hreflang` alternates.
- Imported WordPress form shortcode does not work in static hosting and is replaced with a translated notice.
- Sitemap, robots.txt, blog listing, custom 404, and responsive styling are implemented.

## Media importer

The GitHub workflow `.github/workflows/import-media.yml` runs when `scripts/import-media.py` changes or is manually dispatched. It downloads and verifies only ten explicit public image URLs, commits them into the repository, then builds/deploys. If the old site blocks GitHub Actions, the fallback is to upload **only** `franziska-public-media.zip` as `migration-media.zip` in the repo root and manually rerun the same workflow. Never upload the original full ZIP or XML to the public repository.

## Before DNS cutover

- [x] Confirm the media import workflow committed ten images to `public/wp-content/uploads/`.
- [ ] Set **Settings → Pages → Source: GitHub Actions**.
- [ ] Confirm a green deployment in **Actions → Deploy Astro to GitHub Pages** or the successful media-import deploy job.
- [ ] Check all 15 multilingual pages for typography, text, and navigation.
- [ ] Spot-check articles and blog index. Verify that the old WordPress permalink paths work.
- [ ] Review page titles/canonical/hreflang, sitemap and robots.txt.
- [ ] Replace the disabled SureForms contact form with a static-compatible contact method.
- [ ] Check external images, embeds and outbound links; original Elementor appearance may differ.
- [ ] Confirm no links or media remain dependent on Sakura before cancellation.
- [ ] Verify GitHub Pages custom-domain setup and HTTPS; then update Cloudflare DNS without changing MX/SPF/DKIM/DMARC.
- [ ] Keep the old WordPress server/backups until the new production site has been reviewed.

Current Cloudflare DNS and the old WordPress site have **not** been changed by this migration.
