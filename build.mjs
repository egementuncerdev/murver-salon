/* ==========================================================================
   Build: src/ + public/ → dist/   (bağımlılık yok, Node 18+)
   - Her dil için bütün sayfaları statik HTML olarak üretir
   - CSS/JS adlarına içerik özeti (hash) ekler: uzun süreli önbellek güvenli
   - robots.txt, sitemap.xml, _headers yazar
   ========================================================================== */

import { mkdir, readdir, rm, writeFile, readFile, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { salon, categories, langs } from './src/content.mjs';
import * as T from './src/templates.mjs';

const OUT = 'dist';
const write = async (file, data) => {
  const path = join(OUT, file);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, data);
};

await mkdir(OUT, { recursive: true });
for (const entry of await readdir(OUT)) await rm(join(OUT, entry), { recursive: true, force: true });

/* ---------- Statik dosyalar + hash'li CSS/JS ---------- */
await cp('public', OUT, { recursive: true });
const hashed = async (src, ext) => {
  const data = await readFile(src);
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 10);
  const name = `/assets/${ext === 'css' ? 'style' : 'app'}.${hash}.${ext}`;
  await write(name, data);
  return name;
};
const assets = { css: await hashed('src/style.css', 'css'), js: await hashed('src/app.js', 'js') };

/* ---------- Sayfalar ---------- */
const urls = [];
const page = async (path, html) => {
  await write(join(path, 'index.html'), html);
  urls.push(path);
};
for (const t of langs) {
  await page(t.paths.home, T.home(t, assets));
  await page(t.paths.services, T.servicesPage(t, assets));
  for (const c of categories) await page(T.catPath(t, c), T.categoryPage(t, c, assets));
  await page(t.paths.team, T.teamPage(t, assets));
  await page(t.paths.gallery, T.galleryPage(t, assets));
  await page(t.paths.contact, T.contactPage(t, assets));
  await page(t.paths.book, T.bookPage(t, assets));
  await page(t.paths.privacy, T.privacyPage(t, assets));
}
await write('404.html', T.notFound(assets));

/* ---------- robots, sitemap, başlıklar ---------- */
await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${salon.url}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${salon.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
await write('_headers', `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()${salon.demo ? '\n  X-Robots-Tag: noindex, nofollow' : ''}

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);

console.log(`✓ ${urls.length} sayfa → ${OUT}/  (css: ${assets.css}, js: ${assets.js})`);
