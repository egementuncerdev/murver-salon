/* Fotoğrafları web boyutlarına çevirir: photos/*.jpg → public/img/<ad>-<genişlik>.avif + .webp
   Kaynak JPG'ler repoya girmez (photos/ .gitignore'da); çıktılar girer.
   Çalıştırma: npm i && node scripts/photos.mjs   (yalnızca bu betik sharp ister; site build'i bağımlılıksızdır) */
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const SRC = 'photos';
const OUT = 'public/img';
const WIDTHS = [640, 1200];
await mkdir(OUT, { recursive: true });

const meta = {};
for (const f of (await readdir(SRC)).filter((x) => /\.jpe?g$/i.test(x))) {
  const name = basename(f, extname(f));
  const img = sharp(join(SRC, f)).rotate();
  const { width, height } = await img.metadata();
  for (const w of WIDTHS) {
    const r = img.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: 52, effort: 6 }).toFile(join(OUT, `${name}-${w}.avif`));
    await r.clone().webp({ quality: 76 }).toFile(join(OUT, `${name}-${w}.webp`));
  }
  meta[name] = [width, height];
  console.log(`✓ ${name} (${width}×${height})`);
}
console.log(JSON.stringify(meta));
