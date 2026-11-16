// URLs in WordPress HTML were written for the domain root. During the
// GitHub Pages project preview they must be rooted under the repository.
const base = import.meta.env.BASE_URL || '/';
const normalizedBase = base.endsWith('/') ? base : base + '/';
export const previewPath = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('//') || url.startsWith('#') || /^(?:mailto:|tel:|data:|javascript:)/i.test(url)) return url;
  let value = url;
  if (/^https?:\/\/franziska-zimmer\.com(?=\/|$)/i.test(value)) {
    value = value.replace(/^https?:\/\/franziska-zimmer\.com/i, '') || '/';
  }
  if (!value.startsWith('/') || value.startsWith(normalizedBase)) return value;
  return normalizedBase + value.slice(1);
};

export function rewriteImportedHtml(html) {
  // Keep external links unchanged; rewrite only internal WordPress links
  // and local images (including inline CSS url() and srcset attributes).
  return html
    .replace(/\b(href|src|action|poster)=(["'])(.*?)\2/gi, (full, key, quote, url) => `${key}=${quote}${previewPath(url)}${quote}`)
    .replace(/\b(srcset)=(["'])(.*?)\2/gi, (full, key, quote, value) =>
      `${key}=${quote}${value.split(',').map(candidate => {
        const match = candidate.trim().match(/^(\S+)(\s+.*)?$/);
        return match ? previewPath(match[1]) + (match[2] || '') : candidate;
      }).join(', ')}${quote}`)
    .replace(/url\(\s*(["']?)(https?:\/\/franziska-zimmer\.com\/[^)'"]+|\/[^)'"]+)\1\s*\)/gi, (_full, quote, url) => `url(${quote}${previewPath(url)}${quote})`);
}
