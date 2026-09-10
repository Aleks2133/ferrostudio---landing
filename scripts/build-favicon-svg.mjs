/**
 * Wektoryzuje znak FS z `src/assets/brand/mark-fs.png` do `public/favicon.svg`.
 *
 * Uruchomienie:  node scripts/build-favicon-svg.mjs
 *
 * DLACZEGO
 * --------
 * `favicon.svg` był domyślnym logo Astro. Na stronie, która sprzedaje detal,
 * w karcie przeglądarki siedziało logo frameworka. Prawdziwy znak (F, S i linia
 * cięcia) istniał wyłącznie jako raster 2000 × 2000, bez wariantu na ciemny
 * motyw — a czarny znak znika na ciemnym pasku kart.
 *
 * JAK
 * ---
 * Tym samym silnikiem, którym konfigurator zamienia wgrany logotyp klienta
 * w bryłę 3D: `public/js/ferro-mask.mjs`. Wołamy z niego wyłącznie funkcje
 * czyste (`binarize`, `cropMask`, `traceContours`, `simplify`), które operują
 * na zwykłych tablicach — dzięki temu skrypt działa w gołym Node, bez canvasu
 * i bez przeglądarki. Skalowanie robi `sharp`, które i tak jest w drzewie Astro.
 *
 * Czarne kształty (F i S) idą przez wektoryzację; linia cięcia jest prostą
 * i rysujemy ją analitycznie — obrys prostej z rastra wyszedłby ośmiokątem.
 */
import sharp from 'sharp';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');

/** Źródłowy znak FS — poza `public/`, więc nie trafia na hosting. */
const MARK = path.join(ROOT, 'src', 'assets', 'brand', 'mark-fs.png');

const { binarize, cropMask, traceContours, simplify, signedArea } = await import(
  pathToFileURL(path.join(PUB, 'js', 'ferro-mask.mjs')).href
);

const ONYX = '#191815';
const RUST = '#C1502E';
const SIZE = 128; // viewBox znaku
const RES = 512; // rozdzielczość robocza maski

/**
 * Rasteryzacja do RGBA w rozdzielczości roboczej, z wycięciem linii cięcia:
 * zostaje sam znak. Rdzawa linia ma wysokie R przy wyraźnie niższym B,
 * czerń ma wszystkie kanały nisko — to wystarczy do rozdzielenia.
 */
async function markPixels(file) {
  const { data, info } = await sharp(file)
    .resize(RES, RES, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = new Uint8ClampedArray(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const o = i * 4;
    const dark = data[o + 3] > 128 && data[o] < 96 && data[o + 1] < 96 && data[o + 2] < 96;
    out[o + 3] = dark ? 255 : 0;
  }
  return { data: out, width: info.width, height: info.height };
}

const img = await markPixels(MARK);
const cropped = cropMask(binarize(img), img.width, img.height);
if (!cropped) throw new Error('mark-fs.png: nie znaleziono ciemnych kształtów');

const { mask, w, h } = cropped;

// Tolerancja 0.8 px: proste odcinki litery F zostają proste, a łuki S
// nie łamią się zauważalnie w rozmiarze, w jakim ikona jest oglądana.
const paths = traceContours(mask, w, h)
  .map((c) => simplify(c, 0.8))
  .filter((c) => Math.abs(signedArea(c)) > 12);

// Maska jest przycięta do zawartości — skalujemy z powrotem do kwadratu
// znaku, z marginesem optycznym, zachowując proporcje.
const pad = 8;
const scale = Math.min((SIZE - pad * 2) / w, (SIZE - pad * 2) / h);
const dx = (SIZE - w * scale) / 2;
const dy = (SIZE - h * scale) / 2;
const fmt = (n) => Math.round(n * 100) / 100;

const d = paths
  .map((pts) => `M${pts.map(([x, y]) => `${fmt(x * scale + dx)} ${fmt(y * scale + dy)}`).join('L')}Z`)
  .join('');

// `fill-rule="evenodd"` załatwia dziurę w literze R/S bez sortowania konturów.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <path class="mark" fill-rule="evenodd" d="${d}"/>
  <line class="cut" x1="4" y1="124" x2="124" y2="4" stroke-width="5"/>
  <style>
    .mark { fill: ${ONYX}; }
    .cut { stroke: ${RUST}; }
    @media (prefers-color-scheme: dark) { .mark { fill: #EDEAE3; } }
  </style>
</svg>
`;

await writeFile(path.join(PUB, 'favicon.svg'), svg);
process.stdout.write(
  `  favicon.svg — ${paths.length} konturów, maska ${w}×${h}, ${(Buffer.byteLength(svg) / 1024).toFixed(1)} kB\n`
);
