# Franziska Zimmer — academic website

Astro v6 static website migrated from WordPress, hosted via GitHub Pages.

## Current migrated content

- 15 **published** WordPress pages (English, German, Japanese: five each).
- 144 **published** English blog posts. WordPress URLs are preserved.
- All original published text is in `src/data/import-0.json` through `import-8.json`.
- Routes are generated in `src/pages/[...slug].astro` and the explicit home/about/research/contact components.
- Pages have canonical tags, 3-language equivalents where applicable, a blog index, mobile-friendly styles, sitemap, and robots.txt.
- The previously installed WordPress contact form cannot work on static hosting. A localized notice is displayed until a replacement is chosen.

## One remaining public-media step (browser only)

1. Download the **vetted, published media ZIP** prepared for migration from the ChatGPT conversation (not the original uploads.zip containing private logs and plugin files).
2. On GitHub, open this repository → **Add file** → **Upload files**, upload the vetted ZIP at the repository root named exactly `migration-media.zip`, then commit.
3. Open **Actions → Import vetted WordPress media (one-time) → Run workflow** on main. This verifies the archive's paths and extensions, extracts files into `public/wp-content/uploads/`, commits them, removes the source ZIP from the working tree, and builds/deploys the site. Git history retains the uploaded ZIP; it must contain only already-public images.

The import workflow requires GitHub Actions to have **read/write repository permissions**. Do not upload the complete WordPress XML export, `wp-config.php`, databases, caches, or `uploads.zip` to this public repository.

## GitHub Pages

In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. The ordinary deployment workflow is `.github/workflows/deploy.yml`. Leave Cloudflare DNS unchanged until Pages deployment and review are complete. The Astro `site` is configured for `https://franziska-zimmer.com`; `public/CNAME` also contains this hostname.

## Working with Copilot Free (browser only)

Edit source in https://github.dev/GYF-256/franziska-zimmer-com and commit through Source Control. Use GitHub Actions for builds; github.dev itself has no local terminal.

## Migration safety

Only published pages and posts have been transferred. No private pages or author credentials were imported. Backups must remain off public GitHub. Review imported HTML/CSS against the live WordPress site, especially media-heavy pages and the contact form, before DNS cutover. See `docs/CONTENT_IMPORT.md`.
