import { content } from '../lib/content.js';
const site = 'https://franziska-zimmer.com';
const escapeXml = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export function GET() {
  const paths = [...new Set([...content.map(item=>item.path), '/blog/'])];
  const urls = paths.map(path => '<url><loc>' + escapeXml(new URL(path, site).toString()) + '</loc></url>').join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>', {headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
