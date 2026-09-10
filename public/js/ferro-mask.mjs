/**
 * Ferro — analiza maski: od pliku użytkownika do konturu i geometrii.
 *
 * Ten moduł nie wie nic o three.js ani o DOM strony. Robi cztery rzeczy:
 *   1. zamienia PNG / JPG / SVG / wpisany tekst na binarną maskę materiału,
 *   2. liczy transformatę odległości (jak głęboko w materiale leży piksel),
 *   3. z niej wyprowadza najcieńszy element — realną kompetencję warsztatu,
 *      nie efekt (patrz brief 11.A: „ANALIZA WYKONALNOŚCI"),
 *   4. wektoryzuje kontur do wielokątów, z których powstaje bryła 3D.
 *
 * Zero zależności. Wszystko liczone w przeglądarce użytkownika — plik nie
 * opuszcza jego komputera, dopóki sam nie kliknie wysyłki (brief 11.A).
 *
 * Leży w `public/`, a nie w `src/`, bo ładują go moduły `is:inline`, które
 * importują `three` jako bare specifier z import mapy w BaseLayout. Kod
 * przechodzący przez bundler Astro próbowałby rozwiązać `three` w czasie
 * builda i wywrócił się na braku zależności w package.json.
 */

/** Dłuższy bok maski. 512 px wystarcza na kontur i jest tanie w analizie. */
export const MASK_MAX = 512;

/* ------------------------------------------------------------------ */
/*  1. Rasteryzacja wejścia                                            */
/* ------------------------------------------------------------------ */

function canvasOf(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

/** Wpisuje obraz w kwadrat `max` z zachowaniem proporcji, na przezroczystym tle. */
function drawToFit(source, sw, sh, max) {
  const scale = Math.min(max / sw, max / sh, 1);
  const w = Math.max(2, Math.round(sw * scale));
  const h = Math.max(2, Math.round(sh * scale));
  const c = canvasOf(w, h);
  const g = c.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingQuality = 'high';
  g.drawImage(source, 0, 0, w, h);
  return g.getImageData(0, 0, w, h);
}

/**
 * Próg Otsu — automatyczny podział histogramu na dwie klasy.
 * Dzięki niemu logo w skali szarości albo zdjęcie szkicu daje sensowną maskę
 * bez pytania użytkownika o „poziom progu", którego i tak by nie ustawił.
 */
function otsu(hist, total) {
  let sum = 0;
  for (let i = 0; i < 256; i++) sum += i * hist[i];
  let sumB = 0;
  let wB = 0;
  let best = -1;
  let thr = 127;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (!wB) continue;
    const wF = total - wB;
    if (!wF) break;
    sumB += t * hist[t];
    const between = (wB * wF) * Math.pow(sumB / wB - (sum - sumB) / wF, 2);
    if (between > best) {
      best = between;
      thr = t;
    }
  }
  return thr;
}

/**
 * ImageData → maska binarna.
 *
 * Dwie ścieżki, bo dwa realne typy plików trafiające od klientów:
 *  - logo PNG/SVG na przezroczystym tle → maską jest kanał alfa,
 *  - JPG albo PNG z tłem → próg Otsu na luminancji, a polaryzację
 *    rozstrzygamy po krawędziach kadru (tło dotyka ramki, logo zwykle nie).
 */
export function binarize(img) {
  const { data, width: w, height: h } = img;
  const n = w * h;
  const mask = new Uint8Array(n);

  let opaque = 0;
  for (let i = 0; i < n; i++) if (data[i * 4 + 3] > 128) opaque++;

  if (opaque < n * 0.92) {
    for (let i = 0; i < n; i++) mask[i] = data[i * 4 + 3] > 128 ? 1 : 0;
    return mask;
  }

  const hist = new Uint32Array(256);
  const luma = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const l = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) | 0;
    luma[i] = l;
    hist[l]++;
  }
  const thr = otsu(hist, n);
  for (let i = 0; i < n; i++) mask[i] = luma[i] <= thr ? 1 : 0;

  let border = 0;
  let borderOn = 0;
  for (let x = 0; x < w; x++) {
    border += 2;
    borderOn += mask[x] + mask[(h - 1) * w + x];
  }
  for (let y = 0; y < h; y++) {
    border += 2;
    borderOn += mask[y * w] + mask[y * w + w - 1];
  }
  if (borderOn > border / 2) for (let i = 0; i < n; i++) mask[i] ^= 1;

  return mask;
}

/** Przycięcie do zawartości + 2 px marginesu (kontur musi mieć gdzie się domknąć). */
export function cropMask(mask, w, h, pad = 2) {
  let x0 = w;
  let y0 = h;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!mask[y * w + x]) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) return null;

  const nw = x1 - x0 + 1 + pad * 2;
  const nh = y1 - y0 + 1 + pad * 2;
  const out = new Uint8Array(nw * nh);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (mask[y * w + x]) out[(y - y0 + pad) * nw + (x - x0 + pad)] = 1;
    }
  }
  return { mask: out, w: nw, h: nh };
}

/** PNG / JPG / dowolny obraz rasterowy. */
export async function maskFromImage(img, max = MASK_MAX) {
  const data = drawToFit(img, img.naturalWidth || img.width, img.naturalHeight || img.height, max);
  return cropMask(binarize(data), data.width, data.height);
}

/**
 * SVG. Najpierw przez `<img>` z blob URL — to jedyna droga, która rozumie
 * grupy, transformacje, `<circle>` i `<polygon>`. Gdy przeglądarka odmówi
 * (SVG bez wymiarów, egzotyczne funkcje), schodzimy do parsowania ścieżek
 * przez `Path2D`, zgodnie z briefem 11.A. Obie ścieżki bez bibliotek.
 */
export async function maskFromSvg(text, max = MASK_MAX) {
  const viaImage = await svgViaImage(text, max).catch(() => null);
  if (viaImage) return viaImage;
  return svgViaPath2D(text, max);
}

async function svgViaImage(text, max) {
  // Brak width/height na <svg> daje w Firefoksie kadr 0×0 — dopisujemy je
  // z viewBoxa, zanim oddamy plik przeglądarce.
  let src = text;
  const box = /viewBox\s*=\s*"([^"]+)"/i.exec(text);
  if (box && !/<svg[^>]*\swidth\s*=/i.test(text)) {
    const [, , vw, vh] = box[1].trim().split(/[\s,]+/).map(Number);
    if (vw > 0 && vh > 0) {
      src = text.replace(/<svg/i, `<svg width="${vw}" height="${vh}"`);
    }
  }
  const url = URL.createObjectURL(new Blob([src], { type: 'image/svg+xml' }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const w = img.naturalWidth || max;
    const h = img.naturalHeight || max;
    if (!w || !h) throw new Error('svg bez wymiarów');
    const data = drawToFit(img, w, h, max);
    return cropMask(binarize(data), data.width, data.height);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function svgViaPath2D(text, max) {
  const box = /viewBox\s*=\s*"([^"]+)"/i.exec(text);
  const [minX, minY, vbW, vbH] = box
    ? box[1].trim().split(/[\s,]+/).map(Number)
    : [0, 0, 1000, 1000];
  if (!(vbW > 0) || !(vbH > 0)) return null;

  const scale = Math.min(max / vbW, max / vbH);
  const c = canvasOf(Math.round(vbW * scale), Math.round(vbH * scale));
  const g = c.getContext('2d', { willReadFrequently: true });
  g.scale(scale, scale);
  g.translate(-minX, -minY);
  g.fillStyle = '#000';

  let drew = false;
  for (const m of text.matchAll(/<path\b[^>]*\sd\s*=\s*"([^"]+)"/gi)) {
    try {
      g.fill(new Path2D(m[1]), 'evenodd');
      drew = true;
    } catch {
      /* pojedyncza wadliwa ścieżka nie może wywrócić całego pliku */
    }
  }
  if (!drew) return null;

  const data = g.getImageData(0, 0, c.width, c.height);
  return cropMask(binarize(data), data.width, data.height);
}

/** Wpisany tekst — maska generowana z kroju nagłówkowego marki. */
export function maskFromText(text, max = MASK_MAX) {
  const clean = text.trim();
  if (!clean) return null;

  const px = 220;
  const probe = canvasOf(8, 8).getContext('2d');
  const font = `900 ${px}px "Big Shoulders Display", Impact, "Arial Narrow", sans-serif`;
  probe.font = font;
  const m = probe.measureText(clean);
  const w = Math.ceil(m.width) + px * 0.3;
  const h = px * 1.35;

  const c = canvasOf(Math.max(8, Math.round(w)), Math.round(h));
  const g = c.getContext('2d', { willReadFrequently: true });
  g.font = font;
  g.fillStyle = '#000';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(clean, c.width / 2, c.height / 2);

  const data = drawToFit(c, c.width, c.height, max);
  return cropMask(binarize(data), data.width, data.height);
}

/* ------------------------------------------------------------------ */
/*  2. Transformata odległości i najcieńszy element                    */
/* ------------------------------------------------------------------ */

/**
 * Odległość każdego piksela materiału od najbliższej krawędzi (chamfer 3–4,
 * dwa przebiegi). To jest ten sam „kanał B" co w hero — tam napędza poświatę
 * szczeliny, tutaj analizę wykonalności.
 */
export function distanceTransform(mask, w, h) {
  const INF = 1e9;
  const d = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) d[i] = mask[i] ? INF : 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (d[i] === 0) continue;
      let v = d[i];
      if (y > 0) {
        v = Math.min(v, d[i - w] + 3);
        if (x > 0) v = Math.min(v, d[i - w - 1] + 4);
        if (x < w - 1) v = Math.min(v, d[i - w + 1] + 4);
      }
      if (x > 0) v = Math.min(v, d[i - 1] + 3);
      d[i] = v;
    }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      if (d[i] === 0) continue;
      let v = d[i];
      if (y < h - 1) {
        v = Math.min(v, d[i + w] + 3);
        if (x < w - 1) v = Math.min(v, d[i + w + 1] + 4);
        if (x > 0) v = Math.min(v, d[i + w - 1] + 4);
      }
      if (x < w - 1) v = Math.min(v, d[i + 1] + 3);
      d[i] = v;
    }
  }
  for (let i = 0; i < w * h; i++) d[i] /= 3;
  return d;
}

/**
 * Najcieńsza linia w pliku, w pikselach maski.
 *
 * Grzbiet transformaty odległości to oś każdej kreski, a wartość na grzbiecie
 * to jej połowa szerokości. Bierzemy 5. percentyl, nie minimum — pojedynczy
 * ząbek rasteryzacji nie może zdecydować o ostrzeżeniu dla całego projektu.
 */
export function minStrokePx(mask, dist, w, h) {
  const ridge = [];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      if (!mask[i]) continue;
      const v = dist[i];
      if (v < 0.9) continue;
      let peak = true;
      for (let dy = -1; dy <= 1 && peak; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          if (dist[i + dy * w + dx] > v + 1e-6) {
            peak = false;
            break;
          }
        }
      }
      if (peak) ridge.push(v);
    }
  }
  if (!ridge.length) return null;
  ridge.sort((a, b) => a - b);
  return ridge[Math.floor(ridge.length * 0.05)] * 2;
}

/* ------------------------------------------------------------------ */
/*  3. Wektoryzacja konturu                                            */
/* ------------------------------------------------------------------ */

/**
 * Marching squares ma dwa przypadki dwuznaczne (przekątne). Zamiast
 * rozstrzygać je regułą zależną od kierunku wejścia, domykamy przekątną
 * jednym pikselem — dla cięcia i tak dotknięcie na jeden piksel jest poniżej
 * rozdzielczości maszyny, a tablica przejść robi się jednoznaczna.
 */
function closeDiagonals(src, w, h) {
  const m = Uint8Array.from(src);
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    for (let y = 1; y < h; y++) {
      for (let x = 1; x < w; x++) {
        const a = m[(y - 1) * w + x - 1];
        const b = m[(y - 1) * w + x];
        const c = m[y * w + x - 1];
        const d = m[y * w + x];
        if (a && d && !b && !c) {
          m[(y - 1) * w + x] = 1;
          changed = true;
        } else if (b && c && !a && !d) {
          m[(y - 1) * w + x - 1] = 1;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
  return m;
}

/**
 * Kontury jako zamknięte pętle po krawędziach pikseli.
 * Kierunek obiegu wychodzi z reguły „materiał po lewej", więc znak pola
 * rozróżnia obrys zewnętrzny od otworu — bez osobnego etykietowania spójnych
 * obszarów.
 */
export function traceContours(mask, w, h) {
  const m = closeDiagonals(mask, w, h);
  const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : m[y * w + x]);
  const vw = w + 1;
  const seen = new Uint8Array(vw * (h + 1));
  const DX = [1, 0, -1, 0];
  const DY = [0, 1, 0, -1];

  const exit = (x, y) => {
    const a = at(x - 1, y - 1);
    const b = at(x, y - 1);
    const c = at(x - 1, y);
    const d = at(x, y);
    if (b && !d) return 0;
    if (d && !c) return 1;
    if (c && !a) return 2;
    if (a && !b) return 3;
    return -1;
  };

  const loops = [];
  for (let vy = 0; vy <= h; vy++) {
    for (let vx = 0; vx <= w; vx++) {
      if (seen[vy * vw + vx] || exit(vx, vy) < 0) continue;
      const pts = [];
      let x = vx;
      let y = vy;
      for (;;) {
        const k = y * vw + x;
        if (seen[k]) break;
        seen[k] = 1;
        const dir = exit(x, y);
        if (dir < 0) break;
        pts.push([x, y]);
        x += DX[dir];
        y += DY[dir];
      }
      if (pts.length >= 8) loops.push(pts);
    }
  }
  return loops;
}

export function signedArea(pts) {
  let a = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    a += pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1];
  }
  return a / 2;
}

/** Douglas–Peucker. Kontur po krawędziach pikseli jest schodkowy — bez tego
 *  prosta litera to kilka tysięcy wierzchołków i geometria nie do udźwignięcia. */
export function simplify(pts, tol = 1.2) {
  if (pts.length < 4) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;

  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    let far = -1;
    let best = tol;
    const [x1, y1] = pts[s];
    const [x2, y2] = pts[e];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    for (let i = s + 1; i < e; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / len;
      if (d > best) {
        best = d;
        far = i;
      }
    }
    if (far > 0) {
      keep[far] = 1;
      stack.push([s, far], [far, e]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

function inside(pt, poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/**
 * Pełna wektoryzacja: maska → lista `{ outer, holes }` w układzie znormalizowanym
 * (x w −0.5…0.5, y do góry), gotowa do zamiany na `THREE.Shape`.
 */
export function maskToPolygons(mask, w, h, tol = 1.2) {
  const loops = traceContours(mask, w, h)
    .map((pts) => ({ pts: simplify(pts, tol), area: signedArea(pts) }))
    .filter((l) => l.pts.length >= 3 && Math.abs(l.area) > 6);
  if (!loops.length) return [];

  // Największa pętla jest z definicji obrysem — jej znak wyznacza konwencję.
  const outerSign = Math.sign(loops.reduce((a, b) => (Math.abs(b.area) > Math.abs(a.area) ? b : a)).area);

  const aspect = h / w;
  const norm = (p) => [p[0] / w - 0.5, (0.5 - p[1] / h) * aspect];

  const outers = [];
  const holes = [];
  for (const l of loops) {
    (Math.sign(l.area) === outerSign ? outers : holes).push(l);
  }

  const shapes = outers
    .sort((a, b) => Math.abs(b.area) - Math.abs(a.area))
    .map((o) => ({ raw: o.pts, outer: o.pts.map(norm), holes: [] }));

  for (const hole of holes) {
    // Najmniejszy obrys, który go zawiera — inaczej otwór w literze „o"
    // wewnątrz większej kompozycji trafiłby do niewłaściwego kształtu.
    let host = null;
    for (const s of shapes) {
      if (inside(hole.pts[0], s.raw) && (!host || Math.abs(signedArea(s.raw)) < Math.abs(signedArea(host.raw)))) {
        host = s;
      }
    }
    if (host) host.holes.push(hole.pts.map(norm));
  }

  return shapes.map(({ outer, holes: hs }) => ({ outer, holes: hs }));
}

/**
 * Jedno wywołanie: plik albo tekst → wszystko, czego potrzebuje konfigurator.
 * @returns {Promise<null | {w:number,h:number,aspect:number,polygons:Array,minStrokePx:number|null,maskWidthPx:number}>}
 */
export async function analyze(source, max = MASK_MAX) {
  let cropped = null;

  if (typeof source === 'string') {
    cropped = maskFromText(source, max);
  } else if (source instanceof File || source instanceof Blob) {
    const type = source.type || '';
    const name = 'name' in source ? source.name.toLowerCase() : '';
    if (type.includes('svg') || name.endsWith('.svg')) {
      cropped = await maskFromSvg(await source.text(), max);
    } else {
      const url = URL.createObjectURL(source);
      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        cropped = await maskFromImage(img, max);
      } finally {
        URL.revokeObjectURL(url);
      }
    }
  }

  if (!cropped) return null;
  const { mask, w, h } = cropped;
  const dist = distanceTransform(mask, w, h);

  return {
    w,
    h,
    aspect: h / w,
    maskWidthPx: w,
    minStrokePx: minStrokePx(mask, dist, w, h),
    polygons: maskToPolygons(mask, w, h),
  };
}
