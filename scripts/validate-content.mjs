import fs from 'node:fs';
import path from 'node:path';

const items = Array.from({length:9}, (_,i) => {
  const file = path.join('src','data',`import-${i}.json`);
  return JSON.parse(fs.readFileSync(file,'utf8'));
}).flat();

const publishedPages = items.filter(i => i.type === 'page');
const posts = items.filter(i => i.type === 'post');
const unique = new Set(items.map(i => i.path));
const pageLanguages = Object.fromEntries(['en','de','ja'].map(lang=>[lang,publishedPages.filter(p=>p.lang===lang).length]));

if(items.length !== 159 || publishedPages.length !== 15 || posts.length !== 144 || unique.size !== 159) {
  throw new Error('Migration inventory is incomplete or contains duplicate URLs.');
}
if(Object.values(pageLanguages).some(x=>x!==5)) throw new Error('The three language page groups must contain five pages each.');
if(items.some(i=>!i.path.startsWith('/') || !i.title || !i.html)) throw new Error('A published page is incomplete.');

const images = [
 '2026/02/ACM-DL-Logo-flat-black-URL-small.jpeg',
 '2026/02/FranziskaZimmer-002.jpg',
 '2026/02/PXL_20231008_104808678_crop-scaled.jpg',
 '2026/02/ResearchGate_logo.svg.png',
 '2026/02/scholar_logo_64dp.png',
 '2026/03/9374948530394-300x275.png',
 '2026/03/9374948530394.png',
 '2026/03/cropped-logo2-32x32.png',
 '2026/04/LinkedIn_logo.svg_-scaled.png',
 '2026/04/orcid.png'
];
const missing = images.filter(name=>!fs.existsSync(path.join('public','wp-content','uploads',name)));
if(missing.length) throw new Error('Missing public media: '+missing.join(', '));
console.log('WordPress migration validated: 15 published pages, 144 articles, 10 images, 159 unique URLs.');
