import p0 from '../data/import-0.json';
import p1 from '../data/import-1.json';
import p2 from '../data/import-2.json';
import p3 from '../data/import-3.json';
import p4 from '../data/import-4.json';
import p5 from '../data/import-5.json';
import p6 from '../data/import-6.json';
import p7 from '../data/import-7.json';
import p8 from '../data/import-8.json';

export const content = [...p0,...p1,...p2,...p3,...p4,...p5,...p6,...p7,...p8];
export const pages = content.filter((item) => item.type === 'page');
export const posts = content.filter((item) => item.type === 'post')
  .sort((a,b) => b.date.localeCompare(a.date));
export const getByPath = (path) => content.find((item) => item.path === path);

// Existing WordPress/Polylang page equivalents, confirmed from the export.
const languageGroups = [
  { en:'/', de:'/de/', ja:'/ja/' },
  { en:'/about/', de:'/de/ueber-mich/', ja:'/ja/profile/' },
  { en:'/research/', de:'/de/forschung/', ja:'/ja/kenkyu/' },
  { en:'/contact/', de:'/de/kontakt/', ja:'/ja/form/' },
  { en:'/privacy-policy/', de:'/de/datenschutzerklaerung/', ja:'/ja/privacypolicy/' }
];
export function translationsFor(path) {
  const group = languageGroups.find((x) => Object.values(x).includes(path));
  return group ? Object.entries(group).map(([lang, href]) => ({lang, href})) : [];
}
