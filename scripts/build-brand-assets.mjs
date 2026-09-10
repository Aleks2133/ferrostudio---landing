/**
 * Generuje pliki marki, których nie da się utrzymać ręcznie:
 * obraz Open Graph 1200 × 630 i komplet ikon w realnych rozmiarach.
 *
 * Uruchomienie:  node scripts/build-brand-assets.mjs
 *
 * DLACZEGO TO ISTNIEJE
 * --------------------
 * 1. `og-default.png` był kopią `logo2.png` (1950 × 650). Facebook, LinkedIn
 *    i Slack kadrują wszystko do 1,91:1 — logo w takim pliku dostawało obcięte
 *    boki albo pasy. Każde udostępnienie linku wyglądało na niedokończone.
 * 2. Znak FS leżał w `public/favicon.png` w rozmiarze 2000 × 2000 i był
 *    podawany jako ikona karty ORAZ jako apple-touch-icon: 44 kB pobierane
 *    po to, żeby wyświetlić 32 px. Źródło przeniesione do `src/assets/brand/`,
 *    żeby nie jechało na produkcję — na hosting idą tylko gotowe rozmiary.
 *
 * ZASADA MATERIAŁOWA (brief 1.4)
 * ------------------------------
 * Ten obraz jest w całości proceduralny: płaskie pole, cienkie linie, znak
 * słowny z repozytorium. Zero zdjęć, zero AI, zero stocku. Wyjątek z briefu
 * dopuszcza dokładnie takie grafiki — to element designu, nie dokumentacja.
 *
 * Slot `og-default` w rejestrze ZOSTAJE otwarty: docelowo ma tu być realny kadr
 * z sesji. To jest wersja, która ma nie kompromitować marki do tego czasu.
 */
import sharp from 'sharp';
import path from 'node:path';
import { writeFile, stat } from 'node:fs/promises';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const p = (...s) => path.join(PUB, ...s);

/** Źródłowy znak FS — poza `public/`, więc nie trafia na hosting. */
const MARK = path.join(ROOT, 'src', 'assets', 'brand', 'mark-fs.png');

const ONYX = '#191815';
const BONE = '#EDEAE3';
const RUST = '#C1502E';

/** Znak słowny przemalowany na jasny: bierzemy sam kanał alfa z logo
 *  i podkładamy pod niego jednolity kolor. Oryginał jest czarny, więc
 *  na onyksie byłby niewidoczny. */
async function lightWordmark(width) {
  const src = sharp(p('logo2.png')).ensureAlpha();
  const { width: w, height: h } = await src.metadata();
  const alpha = await src.clone().extractChannel('alpha').toBuffer();

  // Skalowanie MUSI być osobnym przebiegiem: na potoku zaczynającym się od
  // `create` sharp ignoruje `resize` i oddaje obraz w rozmiarze źródła.
  const full = await sharp({ create: { width: w, height: h, channels: 3, background: BONE } })
    .joinChannel(alpha)
    .png()
    .toBuffer();

  return sharp(full).resize({ width, fit: 'inside' }).png().toBuffer();
}

async function buildOg() {
  const W = 1200;
  const H = 630;

  // Warstwa rysunkowa: siatka cienkich linii pod 45° (ten sam raster, co
  // w placeholderach `AssetSlot`) plus jedno cięcie rdzą. Jeden akcent
  // na kadr — dyscyplina koloru z sekcji 6.2.
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <pattern id="raster" width="14" height="14" patternUnits="userSpaceOnUse"
                 patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="${BONE}" stroke-opacity="0.045" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#raster)"/>

      <!-- linia cięcia: ta sama diagonala, co w znaku FS -->
      <line x1="${W * 0.62}" y1="${H + 40}" x2="${W + 40}" y2="-40"
            stroke="${RUST}" stroke-width="3"/>

      <!-- notacja techniczna: znaczniki kadru, nie ozdoba -->
      <g stroke="${BONE}" stroke-opacity="0.28" stroke-width="2">
        <path d="M48 ${H - 48} h34 M48 ${H - 48} v-34"/>
        <path d="M${W - 92} 48 h-34 M${W - 92} 48 v34"/>
      </g>
    </svg>`);

  const mark = await lightWordmark(560);
  const markMeta = await sharp(mark).metadata();

  await sharp({ create: { width: W, height: H, channels: 3, background: ONYX } })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: mark, left: 96, top: Math.round((H - markMeta.height) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile(p('og-default.png'));

  const { size } = await stat(p('og-default.png'));
  return `og-default.png     ${W}×${H}   ${(size / 1024).toFixed(1)} kB`;
}

/** Ikony z realnego znaku FS, w rozmiarach, w jakich są faktycznie używane. */
async function buildIcons() {
  const out = [];
  const jobs = [
    ['favicon-32.png', 32],
    ['favicon-180.png', 180], // apple-touch-icon
    ['icon-192.png', 192], // manifest
    ['icon-512.png', 512], // manifest / splash
  ];
  for (const [name, size] of jobs) {
    await sharp(MARK)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(p(name));
    const { size: bytes } = await stat(p(name));
    out.push(`${name.padEnd(18)} ${size}×${size}   ${(bytes / 1024).toFixed(1)} kB`);
  }
  return out;
}

/**
 * `favicon.ico` — nadal potrzebny, bo część czytników RSS i starsze integracje
 * pytają wprost o `/favicon.ico`. Format ICO od dawna dopuszcza w środku
 * skompresowany PNG, więc kontener składamy ręcznie: 6 bajtów nagłówka
 * katalogu + 16 bajtów wpisu + gotowy PNG. Bez dodatkowej biblioteki.
 */
async function buildIco() {
  const png = await sharp(MARK)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0); // rezerwa
  dir.writeUInt16LE(1, 2); // typ: 1 = ikona
  dir.writeUInt16LE(1, 4); // liczba obrazów

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // szerokość
  entry.writeUInt8(32, 1); // wysokość
  entry.writeUInt8(0, 2); // paleta: 0 = brak
  entry.writeUInt8(0, 3); // rezerwa
  entry.writeUInt16LE(1, 4); // płaszczyzny
  entry.writeUInt16LE(32, 6); // bity na piksel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(dir.length + entry.length, 12); // offset danych

  await writeFile(p('favicon.ico'), Buffer.concat([dir, entry, png]));
  const { size } = await stat(p('favicon.ico'));
  return `favicon.ico        32×32   ${(size / 1024).toFixed(1)} kB`;
}

/** Manifest wskazuje na nowe ikony — inaczej Android nadal bierze plik 2000 px. */
async function buildManifest() {
  const manifest = {
    name: 'Ferro Studio',
    short_name: 'Ferro Studio',
    description: 'Logotypy, napisy i dekoracje ścienne z metalu ciętego na wymiar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#EDEAE3',
    lang: 'pl',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
  await writeFile(p('site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
  return 'site.webmanifest';
}

const lines = [await buildOg(), ...(await buildIcons()), await buildIco(), await buildManifest()];
process.stdout.write(lines.map((l) => `  ${l}`).join('\n') + '\n');
