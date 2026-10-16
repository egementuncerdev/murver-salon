/* Paylaşım görseli (og.png, 1200×630) ve apple-touch-icon.png (180×180) üretir.
   Headless Chrome kullanır; hero fotoğrafı public/img'den alınır. Çalıştırma: node scripts/images.mjs */
import { execFileSync } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const tmp = await mkdtemp(join(tmpdir(), 'mv-img-'));
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=DM+Sans:wght@500;700&display=block">';
const FLOWER = (c, w) => `<g fill="none" stroke="${c}" stroke-width="${w}">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="20" cy="11.5" rx="4.6" ry="7" transform="rotate(${a} 20 20)"/>`).join('')}</g><circle cx="20" cy="20" r="3" fill="${c}"/>`;
const hero = pathToFileURL(resolve('public/img/hero-1200.webp')).href;

async function shoot(name, html, w, h) {
  const file = join(tmp, `${name}.html`);
  await writeFile(file, `<!DOCTYPE html><html><head><meta charset="utf-8">${FONTS}<style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}</style></head><body>${html}</body></html>`);
  execFileSync(CHROME, ['--headless=new', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=1', '--virtual-time-budget=5000',
    `--window-size=${w},${h}`, `--screenshot=${resolve('public', name)}`, pathToFileURL(file).href], { stdio: 'ignore' });
  console.log(`✓ public/${name}`);
}

await shoot('og.png', `
<div style="position:relative;width:1200px;height:630px;background:#2a1a22 url('${hero}') 70% 40%/cover;color:#fff;font-family:'DM Sans'">
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(30,18,24,.88) 0%,rgba(30,18,24,.6) 45%,rgba(30,18,24,.05) 80%)"></div>
  <div style="position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px">
    <svg viewBox="0 0 40 40" style="width:46px">${FLOWER('#fff', 1.6)}</svg>
    <span style="font-family:'Bodoni Moda';font-size:44px">Mürver</span>
  </div>
  <div style="position:absolute;left:72px;top:190px;font-family:'Bodoni Moda';font-size:84px;line-height:1.02">
    <div>Kendinize ayırdığınız</div><div style="font-style:italic">sakin bir saat.</div>
  </div>
  <div style="position:absolute;left:72px;bottom:112px;font-size:24px;color:rgba(255,255,255,.88)">Saç · Tırnak · Cilt bakımı · Makyaj, kaş ve kirpik · Online randevu</div>
  <div style="position:absolute;left:72px;bottom:62px;font-size:17px;font-weight:700;letter-spacing:.14em;color:#e3c9d6">DEMO PROJE · EGEMENTUNCER.DEV</div>
</div>`, 1200, 630);

await shoot('apple-touch-icon.png', `<div style="width:180px;height:180px;display:grid;place-items:center;background:#4a2639"><svg viewBox="0 0 40 40" style="width:112px">${FLOWER('#f5efe8', 1.5)}</svg></div>`, 180, 180);
await rm(tmp, { recursive: true, force: true });
