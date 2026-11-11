/**
 * Jednorazowe pobranie zdjęć ze starej strony tomka.pl do repo
 * (zgodnie z zasadą: nie hotlinkujemy). Optymalizację (AVIF/WebP, rozmiary)
 * robi później Astro (astro:assets) przy buildzie.
 *
 * Uruchomienie:  node scripts/fetch-images.mjs
 * Pliki już istniejące są pomijane, więc skrypt można puszczać wielokrotnie.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'images');
const BASE = 'https://www.tomka.pl/wp-content/uploads';

/**
 * [ścieżka docelowa, lista kandydatów URL – pierwszy działający wygrywa].
 * Dla galerii najpierw próbujemy oryginału, potem wersji 1024 px z WordPressa.
 */
const gallery = [
  '555', '6', '11', '12', '22', '23', '25', '33', '38', '39',
  'DSCN0262', 'DSCN0264', 'DSCN0278', 'DSCN0551', 'DSCN0553', 'DSCN0584',
  'DSCN0590', 'DSCN0591', 'DSCN0592', 'DSCN0594', 'DSCN0597', 'DSCN0598',
  'DSCN0599', 'DSCN0600',
].map((n) => [`gallery/${n.toLowerCase()}.jpg`, [`${BASE}/2019/05/${n}.jpg`, `${BASE}/2019/05/${n}-1024x768.jpg`, `${BASE}/2019/05/${n}-768x1024.jpg`]]);

const named = [
  ['gallery/gozdziki.jpg', [`${BASE}/2019/05/go%C5%BAdziki.jpg`, `${BASE}/2019/05/go%C5%BAdziki-1024x768.jpg`]],
  ['gallery/jezowka.jpg', [`${BASE}/2019/05/jezowka.jpg`, `${BASE}/2019/05/jezowka-1024x655.jpg`]],
  ['gallery/rozaneczniki.jpg', [`${BASE}/2019/05/rozaneczniki.jpg`]],
  ['gallery/pel.jpg', [`${BASE}/2019/05/pel.jpg`, `${BASE}/2019/05/pel-1024x768.jpg`]],
];

const misc = [
  ['logo/tomka-logo.png', [`${BASE}/2019/05/TOMKA-LOGO-png.png`]],
  // Obrazki z wpisów „Aktualności i porady” – do poradnika
  ['guide/trawnik.jpg', [`${BASE}/2020/08/trawnik-jak-za%C5%82o%C5%BCy%C4%87.jpg`]],
  ['guide/swierki.jpg', [`${BASE}/2019/11/swierki.jpg`]],
  ['guide/borowka.jpg', [`${BASE}/2019/07/blueberry-2412112_640.jpg`]],
  ['guide/maczniak.jpg', [`${BASE}/2020/07/m%C4%85czniak-agrestu.jpg`]],
];

const exists = (p) => access(p).then(() => true, () => false);

let ok = 0;
for (const [target, urls] of [...gallery, ...named, ...misc]) {
  const dest = join(ROOT, target);
  if (await exists(dest)) { ok++; continue; }
  let saved = false;
  for (const url of urls) {
    const res = await fetch(url);
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.startsWith('image/')) continue;
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✔ ${target}  ←  ${url}`);
    saved = true; ok++;
    break;
  }
  if (!saved) console.warn(`✘ Nie udało się pobrać: ${target}`);
}
console.log(`\nGotowe: ${ok} plików w ${ROOT}`);
