/**
 * Generuje grafiki do /public: apple-touch-icon, favicon PNG i obrazek
 * Open Graph (1200×630) dla udostępnień na Facebooku/Messengerze.
 * Uruchomienie:  node scripts/generate-icons.mjs  (po zmianie logo lub zdjęcia)
 */
import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => join(root, 'public', f);
const img = (f) => join(root, 'src', 'assets', 'images', f);

// ── Ikony z favicon.svg ──
await sharp(pub('favicon.svg')).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
await sharp(pub('favicon.svg')).resize(32, 32).png().toFile(pub('favicon-32.png'));

// ── Obrazek Open Graph: zdjęcie centrum + panel z logo i hasłem ──
const W = 1200;
const H = 630;
const panelW = 520;

const photo = await sharp(img('gallery/555.jpg'))
  .resize(W - panelW + 40, H, { fit: 'cover' })
  .toBuffer();
const logo = await sharp(img('logo/tomka-logo.png')).resize({ width: 380 }).toBuffer();

const text = Buffer.from(`
<svg width="${panelW}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="0" fill="#faf7f0"/>
  <text x="60" y="330" font-family="Georgia, serif" font-size="46" font-weight="700" fill="#2f4a34">Wszystko dla</text>
  <text x="60" y="385" font-family="Georgia, serif" font-size="46" font-weight="700" fill="#2f4a34">Twojego ogrodu</text>
  <text x="60" y="440" font-family="Georgia, serif" font-size="34" font-style="italic" fill="#55663d">Zaufaj specjalistom!</text>
  <rect x="60" y="490" width="400" height="56" rx="28" fill="#55663d"/>
  <text x="260" y="526" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#ffffff">Sosnowiec · od 1992</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: '#faf7f0' } })
  .composite([
    { input: photo, left: panelW - 40, top: 0 },
    { input: text, left: 0, top: 0 },
    { input: logo, left: 60, top: 110 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(pub('og-image.jpg'));

console.log('✔ apple-touch-icon.png, favicon-32.png, og-image.jpg');
