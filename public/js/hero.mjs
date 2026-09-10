/* ------------------------------------------------------------------ */
/*  Hero: cięcie laserem po REALNYM konturze logotypu.                  */
/* ------------------------------------------------------------------ */
/*  Poprzednia wersja przesuwała przez arkusz prostą pionową kreskę —
 *  czytało się to jak skaner sci-fi, nie jak cięcie. Tutaj głowica jedzie
 *  po faktycznym obrysie liter (marching-neighbour tracing na masce z pliku
 *  logo), a materiał znika dokładnie w kolejności, w jakiej maszyna zamyka
 *  kontury: najpierw wewnętrzne oczka (R, O, D), potem obrys, i wtedy litera
 *  wypada z arkusza. To jest to, co firma realnie robi.
 *
 *  Kontrakt bezpieczeństwa (bez zmian względem wersji inline): scena jest
 *  w pełni opcjonalna. Ładuje się dopiero po `load` + w wolnej klatce, cała
 *  w try/catch — jak cokolwiek padnie, host znika i zostaje czysty ciemny
 *  hero z tekstem. Nic tu nie może zablokować strony.
 *
 *  Warstwy:
 *    maska      — R: materiał, G: akcent rdzy, B: bliskość konturu (poświata
 *                 szczeliny i grat), A: czas uwolnienia elementu
 *    ciepło     — osobny mały render target, dogrzewany pod głowicą i stygnący
 *                 co klatkę; dzięki temu ślad żaru jedzie po dowolnej ścieżce
 *                 i metal stygnie także PO zakończeniu cięcia
 *    litery     — realna bryła (ExtrudeGeometry z fazą) pojawiająca się
 *                 w momencie uwolnienia; arkusz zostaje na shaderze, bo tylko
 *                 tak da się tanio pokazywać dziury przyrastające w czasie
 */

const section = document.querySelector('.hero');
const host = document.getElementById('hero-scene');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- oś czasu (sekundy) — tempo maszynowe, bez pośpiechu -------------- */
const T_IDLE = 0.55; // płyta stoi w świetle, zanim przyjedzie głowica
const T_PIERCE = 0.3; // przebicie materiału przed startem obrysu
const T_CUT = 3.3; // objazd wszystkich konturów
/* Oddech między ostatnią uwolnioną literą a puszczeniem arkusza. Przy 0.45 s
   ostatnia litera („O" w STUDIO) pojawiała się 343 ms przed startem opadania
   — oko łączyło jedno z drugim i czytało to jako „O spada razem z arkuszem".
   Sekunda przerwy rozdziela te dwa zdarzenia na osobne takty. */
const T_DROP = 1.05;
const T_FALL = 0.85;
const T_HOLD = 1.0;

const CUT_START = T_IDLE + T_PIERCE;
const CUT_END = CUT_START + T_CUT;
const WASTE_GO = CUT_END + T_DROP;
const CYCLE = WASTE_GO + T_FALL + T_HOLD;

const FADE = 0.42; // wejście canvasu, żeby start nie był skokiem
const REPLAY_AFTER_HIDDEN = 60_000; // powrót do karty po tylu ms = cięcie od nowa
const CAM_Z = 6.55;

const PLATE_W = 4.2;
const PLATE_H = 1.9;
const PLATE_D = 0.075;

const MASK_W = 1024;
const MASK_H = Math.round((MASK_W * PLATE_H) / PLATE_W);

const isNarrow = () => window.innerWidth < 900;
const idle = () => new Promise((r) => requestAnimationFrame(() => r()));

/* ==================================================================== */
/*  1. Maska z pliku logo                                               */
/* ==================================================================== */

async function readLogo() {
  const base = document.createElement('canvas');
  base.width = MASK_W;
  base.height = MASK_H;
  const ctx = base.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, MASK_W, MASK_H);

  // Realne proporcje pliku logo (1950×650 = 3:1) — INNE niż proporcje skrzynki
  // płyty (PLATE_W/PLATE_H = 2.21:1). Rysujemy przy 80% szerokości maski, więc
  // przy różnicy proporcji zostaje ~20% pustej maski nad i pod logotypem.
  // To musi wiedzieć `layout()`, żeby kadrować kamerę pod treść, a nie pod
  // pustą skrzynkę — inaczej w wąskim pasie na telefonie logo "pływa"
  // w dużym pustym marginesie.
  let drawn = false;
  let contentAspect = 3;
  try {
    const img = new Image();
    img.src = '/logo2.png';
    await img.decode();
    contentAspect = img.naturalWidth / img.naturalHeight;
    const lw = MASK_W * 0.8;
    const lh = lw / contentAspect;
    ctx.drawImage(img, (MASK_W - lw) / 2, (MASK_H - lh) / 2, lw, lh);
    drawn = true;
  } catch {
    /* leci fallback tekstowy niżej */
  }
  if (!drawn) {
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.font = '900 300px "Big Shoulders Display", Impact, sans-serif';
    ctx.fillText('FERRO', MASK_W / 2, MASK_H * 0.62);
    contentAspect = 3;
  }

  const src = ctx.getImageData(0, 0, MASK_W, MASK_H).data;
  const n = MASK_W * MASK_H;
  const material = new Uint8Array(n);
  const accent = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    const r = src[i * 4];
    const g = src[i * 4 + 1];
    const b = src[i * 4 + 2];
    // Rdza z brandingu czyta się jako mocno przesunięta w czerwień,
    // glify są prawie czarne.
    const isRust = r > 130 && r - b > 55 && g < r - 25;
    const isInk = (r + g + b) / 3 < 128;
    if (isRust) accent[i] = 1;
    if (isRust || isInk) material[i] = 1;
  }
  return { material, accent, contentAspect };
}

/* ==================================================================== */
/*  2. Spójne obszary + kontury                                         */
/* ==================================================================== */

/** Etykietowanie 4-spójne. `want` = wartość maski, której szukamy. */
function label(mask, want) {
  const n = MASK_W * MASK_H;
  const labels = new Int32Array(n).fill(-1);
  const comps = [];
  const stack = new Int32Array(n);

  for (let s = 0; s < n; s++) {
    if (mask[s] !== want || labels[s] !== -1) continue;
    const id = comps.length;
    let sp = 0;
    stack[sp++] = s;
    labels[s] = id;
    let count = 0;
    let minX = MASK_W, maxX = -1, minY = MASK_H, maxY = -1;
    let touchesEdge = false;

    while (sp > 0) {
      const p = stack[--sp];
      const x = p % MASK_W;
      const y = (p / MASK_W) | 0;
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x === 0 || y === 0 || x === MASK_W - 1 || y === MASK_H - 1) touchesEdge = true;

      if (x > 0 && mask[p - 1] === want && labels[p - 1] === -1) { labels[p - 1] = id; stack[sp++] = p - 1; }
      if (x < MASK_W - 1 && mask[p + 1] === want && labels[p + 1] === -1) { labels[p + 1] = id; stack[sp++] = p + 1; }
      if (y > 0 && mask[p - MASK_W] === want && labels[p - MASK_W] === -1) { labels[p - MASK_W] = id; stack[sp++] = p - MASK_W; }
      if (y < MASK_H - 1 && mask[p + MASK_W] === want && labels[p + MASK_W] === -1) { labels[p + MASK_W] = id; stack[sp++] = p + MASK_W; }
    }
    comps.push({ id, count, minX, maxX, minY, maxY, touchesEdge, startX: -1, startY: -1 });
  }

  // najwyżej-najbardziej-lewy piksel każdego obszaru = punkt startu obrysu
  for (let y = 0; y < MASK_H; y++) {
    for (let x = 0; x < MASK_W; x++) {
      const id = labels[y * MASK_W + x];
      if (id !== -1 && comps[id].startX === -1) {
        comps[id].startX = x;
        comps[id].startY = y;
      }
    }
  }
  return { labels, comps };
}

/* Moore-neighbour tracing. Zwraca zamkniętą pętlę pikseli obrysu jako
   płaską tablicę [x0,y0,x1,y1,...]. */
const DX = [1, 1, 0, -1, -1, -1, 0, 1];
const DY = [0, 1, 1, 1, 0, -1, -1, -1];

function trace(labels, id, sx, sy) {
  const out = [];
  const inside = (x, y) =>
    x >= 0 && y >= 0 && x < MASK_W && y < MASK_H && labels[y * MASK_W + x] === id;

  let px = sx, py = sy;
  let bx = sx - 1, by = sy; // punkt startowy jest najbardziej lewy, więc lewy sąsiad leży na zewnątrz
  const maxSteps = 4 * (MASK_W + MASK_H) * 4;

  for (let step = 0; step < maxSteps; step++) {
    out.push(px, py);

    let d = 0;
    for (let k = 0; k < 8; k++) {
      if (px + DX[k] === bx && py + DY[k] === by) { d = k; break; }
    }

    let moved = false;
    for (let k = 1; k <= 8; k++) {
      const nd = (d + k) % 8;
      const nx = px + DX[nd];
      const ny = py + DY[nd];
      if (inside(nx, ny)) {
        const pd = (nd + 7) % 8;
        bx = px + DX[pd];
        by = py + DY[pd];
        px = nx;
        py = ny;
        moved = true;
        break;
      }
    }
    if (!moved) break; // pojedynczy piksel
    if (step > 1 && px === sx && py === sy) break;
  }
  return out;
}

/** Douglas–Peucker na płaskiej tablicy [x,y,...]. */
function simplify(pts, eps) {
  const n = pts.length / 2;
  if (n < 4) return pts;
  const keep = new Uint8Array(n);
  keep[0] = 1;
  keep[n - 1] = 1;
  const stack = [[0, n - 1]];

  while (stack.length) {
    const [a, b] = stack.pop();
    if (b <= a + 1) continue;
    const ax = pts[a * 2], ay = pts[a * 2 + 1];
    const bx = pts[b * 2], by = pts[b * 2 + 1];
    const dx = bx - ax, dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    let best = -1, bestD = eps;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs((pts[i * 2] - ax) * dy - (pts[i * 2 + 1] - ay) * dx) / len;
      if (d > bestD) { bestD = d; best = i; }
    }
    if (best !== -1) {
      keep[best] = 1;
      stack.push([a, best], [best, b]);
    }
  }

  const out = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(pts[i * 2], pts[i * 2 + 1]);
  return out;
}

function polyLength(pts) {
  let L = 0;
  for (let i = 2; i < pts.length; i += 2) {
    L += Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]);
  }
  return L;
}

/* ==================================================================== */
/*  3. Plan cięcia                                                      */
/* ==================================================================== */

/**
 * Kolejność jak na maszynie: dla każdej litery najpierw wewnętrzne oczka,
 * potem obrys zewnętrzny — wtedy wykrój puszcza i wypada.
 * Parametryzacja po długości łuku = stała prędkość posuwu, czyli małe litery
 * zajmują proporcjonalnie mniej czasu. Nie trzeba niczego specjalnie ważyć.
 */
async function buildPlan(material) {
  const fg = label(material, 1);
  await idle();
  const bg = label(material, 0);
  await idle();

  const MIN_AREA = 12;
  const letters = [];

  for (const c of fg.comps) {
    if (c.count < MIN_AREA) continue;
    letters.push({ comp: c, holes: [], outer: null, release: 1 });
  }

  // Oczko = obszar tła, który nie dotyka krawędzi obrazu. Literę-właściciela
  // znajdujemy idąc w lewo od skrajnego piksela oczka.
  for (const h of bg.comps) {
    if (h.touchesEdge || h.count < MIN_AREA) continue;
    let owner = -1;
    for (let x = h.startX - 1; x >= 0; x--) {
      const id = fg.labels[h.startY * MASK_W + x];
      if (id !== -1) { owner = id; break; }
    }
    const L = letters.find((l) => l.comp.id === owner);
    if (L) L.holes.push(simplify(trace(bg.labels, h.id, h.startX, h.startY), 1.1));
  }
  await idle();

  for (const L of letters) {
    L.outer = simplify(trace(fg.labels, L.comp.id, L.comp.startX, L.comp.startY), 1.1);
  }
  await idle();

  // Kolejność czytania: najpierw wiersz (logo bywa dwuliniowe), potem od lewej.
  letters.sort((a, b) => {
    const ra = Math.round((a.comp.minY + a.comp.maxY) / 2 / (MASK_H * 0.25));
    const rb = Math.round((b.comp.minY + b.comp.maxY) / 2 / (MASK_H * 0.25));
    return ra !== rb ? ra - rb : a.comp.minX - b.comp.minX;
  });

  const segs = [];
  for (const L of letters) {
    for (const h of L.holes) segs.push({ pts: h, letter: L, last: false });
    segs.push({ pts: L.outer, letter: L, last: true });
  }
  if (!segs.length) return null;

  let raw = 0;
  for (const s of segs) {
    s.len = polyLength(s.pts);
    raw += s.len;
  }
  /* Przystanek na przebicie — STAŁY na każdy kontur, niezależnie od jego
     długości. To nie jest tylko upiększenie: prawdziwa maszyna też traci
     tyle samo czasu na przebicie małej i dużej litery, a do tego rozpędza
     się i hamuje przy każdym konturze. Praktycznie to ratuje czytelność
     wiersza „STUDIO": przy czystej parametryzacji długością łuku sześć
     małych liter przelatywało w ~0.5 s, jedna po drugiej, nie do odczytania. */
  const pierce = (raw / segs.length) * 0.34;
  /* Zapas 1.5% na końcu osi. BEZ NIEGO OSTATNIA LITERA ZNIKA — i to był ten
     nieszczęsny brakujący „O" w STUDIO.
     Mechanizm: czas uwolnienia to `acc / total`, więc dla ostatniego konturu
     wychodzi dokładnie 1.0 (a przez błąd zaokrągleń bywa odrobinę POWYŻEJ).
     Postęp cięcia jest ograniczony do 1.0, więc warunek „postęp >= czas
     uwolnienia" potrafił nigdy nie zostać spełniony. Do tego shader czyta tę
     wartość z tekstury, czyli ZAOKRĄGLONĄ do 1/255 — i wycinał dziurę
     w arkuszu w momencie, w którym JS jeszcze nie pokazywał bryły litery.
     Rozjazd tych dwóch warunków = dziura zamiast litery.
     Ściśnięcie osi o 1.5% sprawia, że ostatnie uwolnienie wypada ~0.985
     i oba warunki spełniają się z zapasem, niezależnie od zaokrągleń. */
  const total = (raw + pierce * segs.length) * 1.015;

  // Próbki ścieżki głowicy: (t, u, v). Podczas przebicia głowica stoi.
  const samples = [];
  let acc = 0;
  for (const s of segs) {
    const u0 = s.pts[0] / MASK_W;
    const v0 = 1 - s.pts[1] / MASK_H;
    s.t0 = acc / total;
    samples.push(s.t0, u0, v0);
    acc += pierce;
    s.tPierced = acc / total;
    samples.push(s.tPierced, u0, v0);

    let run = 0;
    for (let i = 2; i < s.pts.length; i += 2) {
      run += Math.hypot(s.pts[i] - s.pts[i - 2], s.pts[i + 1] - s.pts[i - 1]);
      samples.push(
        (acc + run) / total,
        s.pts[i] / MASK_W,
        1 - s.pts[i + 1] / MASK_H
      );
    }
    acc += s.len;
    s.t1 = acc / total;
    if (s.last) s.letter.release = s.t1;
  }

  return { letters, segs, samples: new Float32Array(samples), fgLabels: fg.labels, compCount: fg.comps.length };
}

/* ==================================================================== */
/*  4. Tekstura maski                                                   */
/* ==================================================================== */

async function bakeMask(THREE, material, accent, plan) {
  const n = MASK_W * MASK_H;

  // Rozmycie materiału = bliskość konturu (poświata szczeliny + grat).
  const blurC = document.createElement('canvas');
  blurC.width = MASK_W;
  blurC.height = MASK_H;
  const bctx = blurC.getContext('2d', { willReadFrequently: true });
  const flat = bctx.createImageData(MASK_W, MASK_H);
  for (let i = 0; i < n; i++) {
    const v = material[i] ? 255 : 0;
    flat.data[i * 4] = flat.data[i * 4 + 1] = flat.data[i * 4 + 2] = v;
    flat.data[i * 4 + 3] = 255;
  }
  const tmp = document.createElement('canvas');
  tmp.width = MASK_W;
  tmp.height = MASK_H;
  tmp.getContext('2d').putImageData(flat, 0, 0);
  if ('filter' in bctx) bctx.filter = 'blur(3px)';
  bctx.drawImage(tmp, 0, 0);
  const blurred = bctx.getImageData(0, 0, MASK_W, MASK_H).data;
  await idle();

  // Czas uwolnienia per piksel. Bez planu (awaryjnie) wraca zwykły przejazd
  // w poziomie — czyli dokładnie stara animacja, ten sam shader.
  const release = new Uint8Array(n);
  if (plan) {
    const perComp = new Float32Array(plan.compCount).fill(1);
    for (const L of plan.letters) perComp[L.comp.id] = L.release;
    const fg = plan.fgLabels;
    for (let i = 0; i < n; i++) {
      if (!material[i]) { release[i] = 255; continue; }
      const id = fg[i];
      release[i] = Math.round(255 * (id >= 0 ? perComp[id] : 1));
    }
  } else {
    for (let i = 0; i < n; i++) release[i] = Math.round(255 * ((i % MASK_W) / MASK_W));
  }

  // DataTexture, nie CanvasTexture: canvas trzyma alfę premultiplied i psułby
  // kanał A, w którym siedzi czas uwolnienia. Wiersz 0 danych to dół tekstury,
  // więc przepisujemy maskę odwróconą — dzięki temu v z vUv pasuje 1:1.
  const data = new Uint8Array(n * 4);
  for (let y = 0; y < MASK_H; y++) {
    const srcRow = (MASK_H - 1 - y) * MASK_W;
    const dstRow = y * MASK_W;
    for (let x = 0; x < MASK_W; x++) {
      const s = srcRow + x;
      const d = (dstRow + x) * 4;
      data[d] = material[s] ? 255 : 0;
      data[d + 1] = accent[s] ? 255 : 0;
      data[d + 2] = blurred[s * 4];
      data[d + 3] = release[s];
    }
  }

  const tex = new THREE.DataTexture(data, MASK_W, MASK_H, THREE.RGBAFormat);
  tex.minFilter = tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

/* ==================================================================== */
/*  5. Pole ciepła (ping-pong render target)                            */
/* ==================================================================== */

function makeHeat(THREE, renderer) {
  let W = 256;
  let H = 128;
  const opts = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  };
  let a = new THREE.WebGLRenderTarget(W, H, opts);
  let b = new THREE.WebGLRenderTarget(W, H, opts);

  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uPrev: { value: null },
      uHead: { value: new THREE.Vector2(-1, -1) },
      uDecay: { value: 0.98 },
      uAdd: { value: 0 },
      uRadius: { value: 0.017 },
      uAspect: { value: PLATE_W / PLATE_H },
    },
    vertexShader: `
      varying vec2 vXy;
      void main() { vXy = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `
      uniform sampler2D uPrev;
      uniform vec2 uHead;
      uniform float uDecay, uAdd, uRadius, uAspect;
      varying vec2 vXy;
      void main() {
        float prev = texture2D(uPrev, vXy).r * uDecay;
        vec2 d = vXy - uHead;
        d.x *= uAspect;
        float blob = exp(-dot(d, d) / (uRadius * uRadius)) * uAdd;
        gl_FragColor = vec4(min(1.0, prev + blob), 0.0, 0.0, 1.0);
      }`,
    depthTest: false,
    depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  quad.frustumCulled = false;
  scene.add(quad);

  const clear = () => {
    const prev = renderer.getRenderTarget();
    for (const rt of [a, b]) {
      renderer.setRenderTarget(rt);
      renderer.clear(true, false, false);
    }
    renderer.setRenderTarget(prev);
  };
  clear();

  return {
    get texture() { return a.texture; },
    clear,
    resize(w, h) {
      W = w; H = h;
      a.setSize(W, H);
      b.setSize(W, H);
      clear();
    },
    step(dt, head, adding) {
      mat.uniforms.uPrev.value = a.texture;
      mat.uniforms.uDecay.value = Math.exp(-dt * 2.1);
      mat.uniforms.uAdd.value = adding ? Math.min(1, dt * 30) : 0;
      mat.uniforms.uHead.value.copy(head);
      const prev = renderer.getRenderTarget();
      renderer.setRenderTarget(b);
      renderer.render(scene, cam);
      renderer.setRenderTarget(prev);
      const t = a;
      a = b;
      b = t;
    },
  };
}

/* ==================================================================== */
/*  6. Scena                                                            */
/* ==================================================================== */

async function boot() {
  const THREE = await import('three');
  // Dodatki z własnego serwera, nie z CDN — patrz scripts/build-vendor-three.mjs.
  const CDN = '/vendor/three/jsm';
  const [
    { RoomEnvironment },
    { RectAreaLightUniformsLib },
    { EffectComposer },
    { RenderPass },
    { UnrealBloomPass },
    { OutputPass },
  ] = await Promise.all([
    import(`${CDN}/environments/RoomEnvironment.js`),
    import(`${CDN}/lights/RectAreaLightUniformsLib.js`),
    import(`${CDN}/postprocessing/EffectComposer.js`),
    import(`${CDN}/postprocessing/RenderPass.js`),
    import(`${CDN}/postprocessing/UnrealBloomPass.js`),
    import(`${CDN}/postprocessing/OutputPass.js`),
  ]);

  const RUST = new THREE.Color('#c1502e');
  const HOT = new THREE.Color('#fff1d6');

  const size = () => ({ w: host.clientWidth || section.clientWidth, h: host.clientHeight || section.clientHeight });
  let { w, h } = size();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
  camera.position.set(0, 0.1, 8.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  let dprCap = isNarrow() ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;
  host.appendChild(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.05).texture;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  // Próg wysoko celowo: świecić ma tylko wiązka, iskry i rozgrzana szczelina —
  // sama stal zostaje ostra, zamiast rozpłynąć się w zupę.
  const bloom = new UnrealBloomPass(new THREE.Vector2(w / 2, h / 2), 0.62, 0.45, 0.72);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* --- tło ---------------------------------------------------------- */
  function backdropTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const g = c.getContext('2d');
    const rad = g.createRadialGradient(256, 250, 20, 256, 256, 300);
    rad.addColorStop(0, '#2b2620');
    rad.addColorStop(0.45, '#1d1b18');
    rad.addColorStop(1, '#0d0c0b');
    g.fillStyle = rad;
    g.fillRect(0, 0, 512, 512);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  const backdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 30),
    new THREE.MeshBasicMaterial({ map: backdropTexture(), depthWrite: false })
  );
  backdrop.position.z = -9;
  scene.add(backdrop);

  /* --- szczotkowana stal (proceduralnie, bez pobierania assetu) ------ */
  function brushedTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#8a8a8a';
    g.fillRect(0, 0, 1024, 512);
    for (let i = 0; i < 9000; i++) {
      const y = Math.random() * 512;
      const len = 60 + Math.random() * 420;
      const x = Math.random() * 1024 - len / 2;
      const v = 118 + Math.random() * 74;
      g.strokeStyle = `rgba(${v},${v},${v},${0.025 + Math.random() * 0.06})`;
      g.lineWidth = Math.random() < 0.85 ? 1 : 2;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + len, y + (Math.random() - 0.5) * 1.2);
      g.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(5, 2.5);
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  }

  /* --- maska + plan cięcia ------------------------------------------ */
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 500))]);
  } catch {}

  const { material, accent } = await readLogo();
  await idle();
  let plan = null;
  try {
    plan = await buildPlan(material);
  } catch {
    plan = null; // awaryjnie: przejazd poziomy, ten sam shader
  }
  await idle();
  const maskTex = await bakeMask(THREE, material, accent, plan);
  const roughTex = brushedTexture();
  RectAreaLightUniformsLib.init();

  const heat = makeHeat(THREE, renderer);

  /* --- materiał stali ------------------------------------------------ */
  const steelShaders = [];
  function makeSteel({ part, flipX }) {
    const mat = new THREE.MeshStandardMaterial({
      color: part ? 0x5a534a : 0x413b34,
      metalness: 0.88,
      roughness: 0.38,
      roughnessMap: roughTex,
      envMapIntensity: 2.6,
    });
    mat.defines = { ...mat.defines, USE_UV: '' };
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMask = { value: maskTex };
      shader.uniforms.uHeat = { value: heat.texture };
      shader.uniforms.uProgress = { value: 0 };
      shader.uniforms.uFlip = { value: flipX ? 1 : 0 };
      shader.uniforms.uAccent = { value: RUST.clone() };
      shader.uniforms.uHot = { value: HOT.clone() };
      shader.uniforms.uPart = { value: part ? 1 : 0 };

      shader.fragmentShader = shader.fragmentShader
        .replace(
          'void main() {',
          `
          uniform sampler2D uMask;
          uniform sampler2D uHeat;
          uniform float uProgress;
          uniform float uFlip;
          uniform float uPart;
          uniform vec3 uAccent;
          uniform vec3 uHot;
          vec4 ferroMask;
          float ferroU;
          float ferroHeat;
          void main() {
            // Tylne ściany mają lustrzane UV — odbijamy, żeby obie strony
            // arkusza czytały ten sam kontur w przestrzeni obiektu.
            ferroU = uFlip > 0.5 ? 1.0 - vUv.x : vUv.x;
            ferroMask = texture2D(uMask, vec2(ferroU, vUv.y));
            bool ferroIsMat = ferroMask.r > 0.5;
            bool ferroFree = ferroIsMat && ferroMask.a <= uProgress;
            if (uPart > 0.5 ? !ferroFree : ferroFree) discard;
            ferroHeat = texture2D(uHeat, vec2(ferroU, vUv.y)).r;
          `
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           diffuseColor.rgb = mix(diffuseColor.rgb, uAccent * 0.75, ferroMask.g * uPart);
           // Udawana ścianka cięcia: ciemna szczelina dokładnie na konturze,
           // a tuż za nią wypolerowany grat. Same płaskie ściany czytają się
           // jak naklejka.
           float ferroDepth = uPart > 0.5 ? ferroMask.b : 1.0 - ferroMask.b;
           float ferroKerf = 1.0 - smoothstep(0.5, 0.56, ferroDepth);
           float ferroBurr = smoothstep(0.5, 0.56, ferroDepth) * (1.0 - smoothstep(0.56, 0.7, ferroDepth));
           diffuseColor.rgb *= mix(1.0, 0.38, ferroKerf);
          `
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
           // Żar czytany z pola ciepła: najgorętszy pod głowicą, stygnie za nią
           // i stygnie dalej długo po zakończeniu cięcia.
           float ferroEdge = 1.0 - smoothstep(0.0, 0.7, abs(ferroMask.b - 0.5) * 2.0);
           float ferroH = clamp(ferroHeat, 0.0, 1.0);
           // Żar trzyma się szczeliny — poza konturem zostaje ledwie tlący ślad,
           // inaczej cała litera świeci na pomarańczowo zamiast być stalą.
           totalEmissiveRadiance += mix(uAccent, uHot, ferroH * ferroH)
             * (ferroEdge * 0.92 + 0.08) * ferroH * 3.4;
           totalEmissiveRadiance += uAccent * ferroMask.g * uPart * 0.22;
           totalEmissiveRadiance += vec3(0.9, 0.86, 0.8) * ferroBurr * 0.5;
          `
        );
      steelShaders.push(shader);
      mat.userData.shader = shader;
    };
    return mat;
  }

  const rig = new THREE.Group();
  scene.add(rig);

  const geo = new THREE.BoxGeometry(PLATE_W, PLATE_H, PLATE_D);

  // Arkusz odpadowy — wszystko, co laser zostawia; dziury przyrastają w czasie.
  const wasteFront = makeSteel({ part: false, flipX: false });
  const wasteBack = makeSteel({ part: false, flipX: true });
  const wasteSide = new THREE.MeshStandardMaterial({
    color: 0x2a2724, metalness: 1.0, roughness: 0.5, envMapIntensity: 1.0,
  });
  const wasteMats = [wasteSide, wasteSide, wasteSide, wasteSide, wasteFront, wasteBack];
  wasteMats.forEach((m) => { m.transparent = true; m.depthWrite = true; });
  const waste = new THREE.Mesh(geo, wasteMats);
  const wasteGroup = new THREE.Group();
  wasteGroup.add(waste);
  rig.add(wasteGroup);

  /* --- gotowy detal: realna bryła z konturów ------------------------- */
  const partGroup = new THREE.Group();
  rig.add(partGroup);

  const letterMeshes = [];
  let partFallback = null;

  function buildLetters() {
    if (!plan) return false;
    const toV = (px, py) => new THREE.Vector2((px / MASK_W - 0.5) * PLATE_W, (0.5 - py / MASK_H) * PLATE_H);
    let built = 0;

    for (const L of plan.letters) {
      if (!L.outer || L.outer.length < 8) continue;
      const pts = [];
      for (let i = 0; i < L.outer.length; i += 2) pts.push(toV(L.outer[i], L.outer[i + 1]));
      const shape = new THREE.Shape(pts);
      for (const hole of L.holes) {
        if (hole.length < 8) continue;
        const hp = [];
        for (let i = 0; i < hole.length; i += 2) hp.push(toV(hole[i], hole[i + 1]));
        shape.holes.push(new THREE.Path(hp));
      }

      let g;
      try {
        g = new THREE.ExtrudeGeometry(shape, {
          depth: PLATE_D,
          bevelEnabled: true,
          bevelThickness: 0.007,
          bevelSize: 0.005,
          bevelOffset: 0,
          bevelSegments: 2,
          steps: 1,
        });
      } catch {
        continue;
      }
      if (!g.attributes.position || g.attributes.position.count === 0) continue;

      g.translate(0, 0, -PLATE_D / 2);
      g.computeBoundingBox();
      const c = new THREE.Vector3();
      g.boundingBox.getCenter(c);
      g.translate(-c.x, -c.y, -c.z);
      g.computeVertexNormals();

      // Osobny materiał na literę, żeby każda mogła stygnąć własnym tempem.
      // Metalness 0.72 (nie 0.9): przy niemal czystym metalu światło kierunkowe
      // prawie nie daje rozproszenia, a małe litery („STUDIO") odbijają głównie
      // ciemne tło — czytały się jak czarne dziury. Odrobina rozproszenia plus
      // mocniejsze środowisko sprawiają, że mały wiersz w ogóle widać.
      const mat = new THREE.MeshStandardMaterial({
        color: 0x6b6359,
        metalness: 0.72,
        roughness: 0.4,
        roughnessMap: roughTex,
        envMapIntensity: 3.4,
        emissive: RUST.clone(),
        emissiveIntensity: 0,
      });
      const mesh = new THREE.Mesh(g, mat);
      mesh.position.copy(c);
      mesh.visible = false;
      mesh.userData = { release: L.release, born: -1, home: c.clone() };
      partGroup.add(mesh);
      letterMeshes.push(mesh);
      built++;
    }
    return built > 0;
  }

  let useRealLetters = false;
  try {
    useRealLetters = buildLetters();
  } catch {
    useRealLetters = false;
  }

  if (!useRealLetters) {
    // Awaryjnie: gotowy detal na shaderze (jak w wersji poprzedniej).
    const partFront = makeSteel({ part: true, flipX: false });
    const partBack = makeSteel({ part: true, flipX: true });
    const hidden = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    partFallback = new THREE.Mesh(geo, [hidden, hidden, hidden, hidden, partFront, partBack]);
    partGroup.add(partFallback);
  }

  /* --- światło ------------------------------------------------------- */
  const ambient = new THREE.AmbientLight(0x3a332c, 0.9);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff4e6, 3.2);
  key.position.set(3.4, 4.2, 6);
  scene.add(key);

  // Duże miękkie źródła robią z metalu metal — twardy punkt na połysku to kropka.
  const softCool = new THREE.RectAreaLight(0xdfe8ff, 6.5, 9, 5);
  softCool.position.set(-5, 3, 5);
  softCool.lookAt(0, 0, 0);
  scene.add(softCool);

  const softWarm = new THREE.RectAreaLight(0xffd8b0, 4.5, 7, 3.5);
  softWarm.position.set(5, -2.6, 4.2);
  softWarm.lookAt(0, 0, 0);
  scene.add(softWarm);

  const rim = new THREE.PointLight(0xd9642e, 11, 16, 2);
  rim.position.set(-3.6, -1.4, 1.8);
  scene.add(rim);

  /* Wypełnienie dolno-lewej strefy płyty. Tam siedzi mały wiersz „STUDIO",
     który przy samym świetle kluczowym (prawa góra) schodził do czerni —
     litery fizycznie były, ale ostatnia („O") była nie do zobaczenia.
     Chłodne i słabe, żeby nie spłaszczyć modelunku dużego „FERRO". */
  const fill = new THREE.DirectionalLight(0xe6e9f0, 1.2);
  fill.position.set(-4.2, -2.6, 5.5);
  scene.add(fill);

  const backlight = new THREE.PointLight(0xc1502e, 5, 10, 2);
  backlight.position.set(0, 0, -1.5);
  scene.add(backlight);

  /* --- wiązka: twardy rdzeń + miękka aureola ------------------------- */
  function beamTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const across = g.createLinearGradient(0, 0, 128, 0);
    across.addColorStop(0, 'rgba(255,120,50,0)');
    across.addColorStop(0.5, 'rgba(255,196,132,1)');
    across.addColorStop(1, 'rgba(255,120,50,0)');
    g.fillStyle = across;
    g.fillRect(0, 0, 128, 128);
    const along = g.createLinearGradient(0, 0, 0, 128);
    along.addColorStop(0, 'rgba(0,0,0,1)');
    along.addColorStop(0.12, 'rgba(0,0,0,0)');
    along.addColorStop(0.88, 'rgba(0,0,0,0)');
    along.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out';
    g.fillStyle = along;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  // Wiązka jest teraz krótka i pionowa nad punktem cięcia — jedzie za głowicą
  // po konturze, zamiast przecinać całą płytę jak skaner.
  const beamCore = new THREE.Mesh(
    new THREE.PlaneGeometry(0.02, 0.62),
    new THREE.MeshBasicMaterial({
      color: 0xfff0dc, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
  );
  const beamHalo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.26, 0.8),
    new THREE.MeshBasicMaterial({
      map: beamTexture(), transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
  );
  beamCore.position.z = PLATE_D / 2 + 0.02;
  beamHalo.position.z = PLATE_D / 2 + 0.015;
  // Wiązka wychodzi z góry, więc kotwiczymy ją nad punktem styku.
  beamCore.geometry.translate(0, 0.31, 0);
  beamHalo.geometry.translate(0, 0.4, 0);
  rig.add(beamHalo, beamCore);

  const head = new THREE.PointLight(0xff8c3c, 0, 2.6, 2);
  head.position.z = PLATE_D / 2 + 0.15;
  rig.add(head);

  /* --- iskry --------------------------------------------------------- */
  let SPARK_MAX = 520;
  function sparkSprite() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rad.addColorStop(0, 'rgba(255,255,255,1)');
    rad.addColorStop(0.25, 'rgba(255,214,150,0.85)');
    rad.addColorStop(1, 'rgba(255,140,40,0)');
    g.fillStyle = rad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  const sPos = new Float32Array(SPARK_MAX * 3);
  const sCol = new Float32Array(SPARK_MAX * 3);
  const sVel = new Float32Array(SPARK_MAX * 3);
  const sLife = new Float32Array(SPARK_MAX);
  const sSpan = new Float32Array(SPARK_MAX);
  let sCursor = 0;
  let sparkBudget = SPARK_MAX;

  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sparkGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      size: 0.038, map: sparkSprite(), vertexColors: true, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    })
  );
  sparks.frustumCulled = false;
  rig.add(sparks);

  // Iskry lecą z realnej pozycji głowicy, do tyłu względem kierunku jazdy —
  // tak leci żużel z prawdziwej szczeliny.
  function spawnSparks(lx, ly, dirX, dirY, count) {
    for (let k = 0; k < count; k++) {
      const i = sCursor;
      sCursor = (sCursor + 1) % sparkBudget;
      sPos[i * 3] = lx;
      sPos[i * 3 + 1] = ly;
      sPos[i * 3 + 2] = PLATE_D / 2;
      const spread = (Math.random() - 0.5) * 1.1;
      sVel[i * 3] = -dirX * (0.6 + Math.random() * 1.6) + spread * 0.5;
      sVel[i * 3 + 1] = -dirY * (0.6 + Math.random() * 1.6) - 0.25 - Math.random() * 1.1;
      sVel[i * 3 + 2] = 0.5 + Math.random() * 1.9;
      sSpan[i] = 0.42 + Math.random() * 0.55;
      sLife[i] = sSpan[i];
    }
  }

  function stepSparks(dt) {
    for (let i = 0; i < SPARK_MAX; i++) {
      if (sLife[i] <= 0) {
        sCol[i * 3] = sCol[i * 3 + 1] = sCol[i * 3 + 2] = 0;
        continue;
      }
      sLife[i] -= dt;
      sVel[i * 3 + 1] -= 3.1 * dt;
      const drag = 1 - 1.6 * dt;
      sVel[i * 3] *= drag;
      sVel[i * 3 + 2] *= drag;
      sPos[i * 3] += sVel[i * 3] * dt;
      sPos[i * 3 + 1] += sVel[i * 3 + 1] * dt;
      sPos[i * 3 + 2] += sVel[i * 3 + 2] * dt;
      const f = Math.max(0, sLife[i] / sSpan[i]);
      const flick = 0.75 + Math.random() * 0.25;
      sCol[i * 3] = 2.4 * f * flick;
      sCol[i * 3 + 1] = 1.15 * f * f * flick;
      sCol[i * 3 + 2] = 0.32 * f * f * f * flick;
    }
    sparkGeo.attributes.position.needsUpdate = true;
    sparkGeo.attributes.color.needsUpdate = true;
  }

  /* --- kadrowanie ---------------------------------------------------- */
  let fitScale = 1;
  let fitX = 0;
  let fitY = 0;
  let narrowMode = isNarrow();

  function layout() {
    const s = size();
    if (!s.w || !s.h) return;
    narrowMode = isNarrow();
    camera.aspect = s.w / s.h;
    camera.updateProjectionMatrix();

    // Dopasowanie do realnego frustum na dystansie spoczynkowym — sztywna
    // skala przycinałaby logotyp na wysokich telefonach.
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * CAM_Z;
    const vw = vh * camera.aspect;
    // CAŁA płyta w kadrze z marginesem — na obu układach ta sama zasada.
    // Wcześniej telefon kadrował pod sam tusz logotypu i płyta wychodziła
    // poza ekran: zamiast arkusza stali, z którego laser wycina detal, był
    // ciasny pasek wypełniony po brzegi (czytało się jak kadr z filmu).
    // Widoczne krawędzie arkusza + powietrze dookoła = detal „lewituje",
    // tak jak na desktopie.
    fitScale = narrowMode
      ? Math.min((vw * 0.86) / PLATE_W, (vh * 0.8) / PLATE_H)
      : Math.min((vw * 0.56) / PLATE_W, (vh * 0.55) / PLATE_H);
    // Na telefonie scena ma własny pas, więc płyta stoi w jego środku.
    fitX = narrowMode ? 0 : vw * 0.18;
    fitY = narrowMode ? 0 : 0.05;

    // NIE przyciemniamy już telefonu globalnie. Poprzednio zbita ekspozycja
    // (1.05) i ścięte światło ciepłe miały naprawić „łososiowy" odcień, ale
    // wpychały mały wiersz „STUDIO" w czerń — litery były, tylko niewidoczne.
    // Rdzawy rim zostaje lekko ściągnięty (to on robił łosoś z bliska),
    // a czytelność małych liter ratuje osobne wypełnienie `fill`.
    rim.intensity = narrowMode ? 7.5 : 11;
    softCool.intensity = narrowMode ? 7.5 : 6.5;
    softWarm.intensity = 4.5;
    fill.intensity = narrowMode ? 2.4 : 1.2;
    ambient.intensity = narrowMode ? 1.35 : 0.9;
    renderer.toneMappingExposure = 1.16;

    renderer.setSize(s.w, s.h);
    composer.setSize(s.w, s.h);
    bloom.setSize(s.w / 2, s.h / 2);
  }
  layout();
  window.addEventListener('resize', layout);
  // Pas sceny na telefonie zmienia wysokość razem z paskiem adresu.
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(host);

  /* --- wskaźnik: przeciąganie + paralaksa ---------------------------- */
  let dragging = false;
  let last = null;
  let dragX = 0, dragY = 0;
  let parX = 0, parY = 0;
  let curX = 0, curY = 0;

  const el = renderer.domElement;
  el.addEventListener('pointerdown', (e) => {
    dragging = true;
    last = { x: e.clientX, y: e.clientY };
    el.classList.add('is-dragging');
    el.setPointerCapture?.(e.pointerId);
  });
  window.addEventListener('pointermove', (e) => {
    if (dragging && last) {
      dragX = THREE.MathUtils.clamp(dragX + (e.clientX - last.x) * 0.005, -0.55, 0.55);
      dragY = THREE.MathUtils.clamp(dragY + (e.clientY - last.y) * 0.004, -0.22, 0.22);
      last = { x: e.clientX, y: e.clientY };
    } else {
      const s = size();
      parX = (e.clientX / s.w - 0.5) * 0.14;
      parY = (e.clientY / s.h - 0.5) * 0.07;
    }
  });
  const endDrag = () => { dragging = false; last = null; el.classList.remove('is-dragging'); };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (dragging || e.beta === null || e.gamma === null) return;
      parY = THREE.MathUtils.clamp((e.beta - 45) * 0.004, -0.16, 0.16);
      parX = THREE.MathUtils.clamp(e.gamma * 0.005, -0.3, 0.3);
    });
  }

  let onScreen = true;
  new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { threshold: 0 }).observe(section);

  /* --- adaptacyjna jakość -------------------------------------------- */
  let qLevel = 2;
  let qFrames = 0;
  let qSum = 0;
  let qCount = 0;

  function downgrade() {
    if (qLevel === 2) {
      qLevel = 1;
      bloom.enabled = false;
      sparkBudget = Math.min(sparkBudget, 240);
      dprCap = 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
      layout();
    } else if (qLevel === 1) {
      qLevel = 0;
      sparkBudget = Math.min(sparkBudget, 120);
      heat.resize(128, 64);
    }
  }

  function sampleQuality(dt) {
    qFrames++;
    if (qFrames < 24 || qLevel === 0) return; // pomijamy rozgrzewkę
    qSum += dt;
    qCount++;
    if (qCount < 45) return;
    const avg = qSum / qCount;
    qSum = 0;
    qCount = 0;
    if (avg > 0.028) downgrade();
  }

  /* --- ścieżka głowicy ----------------------------------------------- */
  const headUV = new THREE.Vector2(0.5, 0.5);
  const headPrev = new THREE.Vector2(0.5, 0.5);
  let sampleCursor = 0;

  function headAt(t) {
    const S = plan && plan.samples;
    if (!S) {
      headUV.set(THREE.MathUtils.clamp(t, 0, 1), 0.5);
      return;
    }
    const n = S.length / 3;
    if (sampleCursor >= n - 1 || S[sampleCursor * 3] > t) sampleCursor = 0;
    while (sampleCursor < n - 2 && S[(sampleCursor + 1) * 3] <= t) sampleCursor++;
    const i = sampleCursor;
    const t0 = S[i * 3], t1 = S[(i + 1) * 3];
    const k = t1 > t0 ? (t - t0) / (t1 - t0) : 0;
    headUV.set(
      S[i * 3 + 1] + (S[(i + 1) * 3 + 1] - S[i * 3 + 1]) * k,
      S[i * 3 + 2] + (S[(i + 1) * 3 + 2] - S[i * 3 + 2]) * k
    );
  }

  /* --- pętla ---------------------------------------------------------- */
  const clock = new THREE.Clock();
  const easeOutQuint = (x) => 1 - Math.pow(1 - x, 5);
  let started = false;
  let cycleStart = 0;
  let curScale = 0;
  let curPosX = 0;
  let curPosY = 0;
  let seeded = false;

  const replay = () => {
    cycleStart = clock.getElapsedTime();
    sampleCursor = 0;
    heat.clear();
    for (const m of letterMeshes) {
      m.visible = false;
      m.userData.born = -1;
    }
    for (let i = 0; i < SPARK_MAX; i++) sLife[i] = 0;
  };

  const replayBtn = document.getElementById('hero-replay');
  if (replayBtn) {
    replayBtn.hidden = false;
    replayBtn.addEventListener('click', replay);
  }

  // Wracasz do karty po dłuższej chwili — cięcie leci od nowa. W obrębie
  // jednej wizyty scena nie zapętla się sama, żeby nie nagabywać.
  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else if (hiddenAt && Date.now() - hiddenAt > REPLAY_AFTER_HIDDEN) replay();
  });

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!onScreen || document.hidden) return;
    const t = clock.getElapsedTime();
    sampleQuality(dt);

    // Oś czasu zatrzymuje się na końcu cyklu i tam zostaje — wszystkie
    // wyliczenia niżej same osiadają w stanie końcowym.
    const tl = Math.min(t - cycleStart, CYCLE);
    if (tl > 0.05) started = true;
    el.style.opacity = String(Math.min(1, Math.max(0, tl) / FADE));

    /* postęp cięcia 0..1 */
    const p = THREE.MathUtils.clamp((tl - CUT_START) / T_CUT, 0, 1);
    const cutting = tl >= CUT_START && tl <= CUT_END;

    headPrev.copy(headUV);
    headAt(p);

    // kierunek jazdy w przestrzeni płyty (do rzucania iskier w tył)
    let dirX = headUV.x - headPrev.x;
    let dirY = headUV.y - headPrev.y;
    const dl = Math.hypot(dirX, dirY) || 1;
    dirX /= dl;
    dirY /= dl;

    const headLX = (headUV.x - 0.5) * PLATE_W;
    const headLY = (headUV.y - 0.5) * PLATE_H;

    // Pole ciepła musi dostać jedną klatkę „na sucho", zanim shader je czyta.
    heat.step(dt, headUV, cutting);
    if (!seeded) { seeded = true; }

    for (const sh of steelShaders) {
      sh.uniforms.uProgress.value = p;
      sh.uniforms.uHeat.value = heat.texture;
    }

    /* wiązka i światło głowicy */
    beamCore.position.x = beamHalo.position.x = head.position.x = headLX;
    beamCore.position.y = beamHalo.position.y = head.position.y = headLY;
    const beamFade = cutting ? 1 : Math.max(0, 1 - (tl - CUT_END) / 0.35);
    beamCore.material.opacity = beamFade * (0.85 + Math.sin(t * 60) * 0.15);
    beamHalo.material.opacity = beamFade * 0.5;
    head.intensity = beamFade * (7 + Math.sin(t * 45) * 1.6);

    if (cutting) spawnSparks(headLX, headLY, dirX, dirY, qLevel === 2 ? 9 : 5);
    stepSparks(dt);

    /* uwolnienie liter — realna bryła wchodzi dokładnie w momencie,
       gdy arkusz traci swój wykrój */
    let justReleased = 0;
    for (const m of letterMeshes) {
      /* Tolerancja 1/255 = jeden krok kwantyzacji kanału, z którego tę samą
         wartość czyta shader arkusza. Dzięki temu bryła litery nie może
         pojawić się PÓŹNIEJ niż arkusz wytnie po niej dziurę — a różnica
         choćby o jeden krok zostawiała pustkę zamiast litery. */
      const rel = m.userData.release - 1 / 255;
      if (!m.visible && p >= rel) {
        m.visible = true;
        m.userData.born = tl;
        justReleased++;
      } else if (m.visible && p < rel) {
        m.visible = false;
        m.userData.born = -1;
      }
      if (m.visible && m.userData.born >= 0) {
        const age = tl - m.userData.born;
        // świeżo wycięta krawędź stygnie
        m.material.emissiveIntensity = Math.max(0, 1.15 * Math.exp(-age * 1.6));
        // ledwo wyczuwalne osiadanie wykroju
        const s = 1 + Math.sin(Math.min(1, age / 0.55) * Math.PI) * 0.02;
        m.scale.setScalar(s);
        m.position.z = m.userData.home.z + Math.sin(Math.min(1, age / 0.7) * Math.PI) * 0.05;
      }
    }
    if (justReleased) {
      spawnSparks(headLX, headLY, dirX, dirY, qLevel === 2 ? 16 : 8);
    }

    const breakFlash = tl > WASTE_GO ? Math.exp(-Math.pow((tl - WASTE_GO) / 0.22, 2)) : 0;
    backlight.intensity = 3 + p * 4 + breakFlash * 13 + justReleased * 2.5;

    if (partFallback) {
      // wariant awaryjny — detal też na shaderze
      partFallback.visible = true;
    }

    /* arkusz odpadowy puszcza i odpada */
    const fall = THREE.MathUtils.clamp((tl - WASTE_GO) / T_FALL, 0, 1);
    const g = fall * fall;
    wasteGroup.visible = fall < 1;
    wasteGroup.position.y = -g * 8.5;
    wasteGroup.position.z = -g * 3.5;
    wasteGroup.rotation.x = g * 1.15;
    wasteGroup.rotation.z = g * 0.18;
    wasteMats.forEach((m) => { m.opacity = 1 - Math.min(1, fall * 1.9); });

    /* Kadr stoi w miejscu (cała płyta zawsze w całości, luźno) — delikatny
       oddech w trakcie cięcia, bez podążania kamery za głowicą. Wcześniej na
       telefonie kamera ciasno śledziła głowicę (makro): dawało to złudzenie
       filmiku i przy pechowym momencie ucinało literę na krawędzi kadru
       (np. "O" w STUDIO). Rezygnacja z podążania usuwa to ryzyko całkowicie. */
    let tScale = fitScale;
    const tX = fitX;
    const tY = fitY;
    let k = 3;
    if (cutting) {
      tScale = fitScale * (narrowMode ? 1.05 : 1.1);
      k = narrowMode ? 3.2 : 2.2;
    }
    if (curScale === 0) { curScale = tScale; curPosX = tX; curPosY = tY; }
    const a = 1 - Math.exp(-dt * k);
    curScale += (tScale - curScale) * a;
    curPosX += (tX - curPosX) * a;
    curPosY += (tY - curPosY) * a;
    rig.scale.setScalar(curScale);
    rig.position.x = curPosX;
    rig.position.y = curPosY;

    /* powolny przejazd refleksu po stali w trakcie postoju */
    key.position.x = 3.4 + Math.sin(t * 0.32) * 2.6;
    key.position.y = 4.2 + Math.cos(t * 0.24) * 0.8;

    // Najazd kamery tylko przy pierwszym wejściu.
    if (!started || t < 3.2) {
      camera.position.z = 8.4 - easeOutQuint(Math.min(1, t / 2.8)) * (8.4 - CAM_Z);
    }

    const floatY = Math.sin(t * 0.24) * 0.05;
    const floatX = Math.sin(t * 0.19) * 0.025;
    curX += (dragY + parY + floatX - curX) * 0.05;
    curY += (dragX + parX + floatY - curY) * 0.05;
    rig.rotation.x = curX;
    rig.rotation.y = curY;

    composer.render();
  }
  frame();
}

/* Nigdy nie blokujemy strony sceną: czekamy na `load`, potem na wolną klatkę. */
if (!reduceMotion && host && section) {
  const kick = () => {
    const go = () =>
      boot().catch(() => {
        // Bez sceny pas na telefonie zostałby pustą dziurą — zwijamy go.
        host.remove();
        section.classList.add('hero--nostage');
      });
    if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 2500 });
    else setTimeout(go, 400);
  };
  if (document.readyState === 'complete') kick();
  else window.addEventListener('load', kick, { once: true });
}
