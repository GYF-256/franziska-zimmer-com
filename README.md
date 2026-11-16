# Franziska Zimmer — academic website

Astro v6 static website migrated from the published WordPress content, for GitHub Pages.

## Imported content

- **15 published pages**: five each in English, German, and Japanese.
- **144 published English blog posts**, at their original WordPress URLs.
- Published text is stored in `src/data/import-0.json` through `import-8.json`.
- Routing: `src/pages/[...slug].astro` plus home/about/research/contact page files.
- English/German/Japanese navigation, verified page translations, blog listing, canonical metadata, sitemap and robots.txt.
- The WordPress form shortcode has been replaced with a localized notice. A new static-compatible contact method is still required.

## Images: automatic import or fallback ZIP

The one-time workflow **Actions → Import vetted WordPress media (one-time)** downloads exactly ten already-published photos/logos from the existing WordPress site. Every image is checked against the original ZIP backup using its SHA-256 hash before it is committed to `public/wp-content/uploads/`. A change to the import script triggers the workflow automatically; it can also be run manually.

If GitHub Actions cannot access the old site, download `franziska-public-media.zip` from the ChatGPT conversation. In GitHub's web interface, choose **Add file → Upload files**, upload it at repository root as `migration-media.zip`, and commit. Then rerun the media import workflow. Never upload the original `uploads.zip` containing plugin caches or logs.

## Deployment

Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. `.github/workflows/deploy.yml` builds and deploys Astro. The production host is configured as `https://franziska-zimmer.com`, but **do not alter Cloudflare DNS until Pages deployment and content review are complete**.

The media importer needs repository write permission for workflows. If it fails to push, check **Settings → Actions → General → Workflow permissions**.

## Browser-only maintenance

Use https://github.dev/GYF-256/franziska-zimmer-com with GitHub Copilot Free, commit files via Source Control, and let GitHub Actions run the builds. No local installation is required.

## Security / remaining work

Only public WordPress pages/posts and selected public images are migrated. Three private pages, passwords, account data, WordPress plugins, PHP, logs, and database dumps are excluded. Keep the current WordPress site and private backups until the new Pages site has been reviewed, including images, long-form articles, menus, SEO, the privacy policy, external links, and the disabled contact form. See `docs/CONTENT_IMPORT.md`.
