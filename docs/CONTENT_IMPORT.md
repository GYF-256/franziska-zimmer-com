# Content import checklist

This is an **initial scaffold**, not a complete migration of the live website.

- Export WordPress XML and back up the database and wp-content/uploads privately.
- Inventory existing URLs, page text, research items, media and translations.
- Replace placeholder pages with verified content and local media.
- Implement English, German and Japanese routes and hreflang only after translations and URL inventory are available.
- Check contact forms: GitHub Pages cannot execute PHP or WordPress forms.
- Review metadata, sitemap, redirects, accessibility and images before switching DNS.
- Configure Settings > Pages > Source: GitHub Actions.
- Confirm Actions deployment and custom domain before changing Cloudflare DNS.
- Preserve all email DNS records and cancel Sakura only after verifying no services depend on it.
