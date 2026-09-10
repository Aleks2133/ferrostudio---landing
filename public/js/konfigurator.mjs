/**
 * Ferro — konfigurator „Wgraj swoje logo".
 *
 * Silnik jest rozbudową sceny z hero (brief 11.A): to samo pakowanie maski
 * z pliku, to samo środowisko PMREM, ta sama dyscyplina wydajnościowa.
 * Nowe względem hero:
 *   - realna geometria wyciągnięta z konturu (ExtrudeGeometry), a nie płyta
 *     z `discard` w shaderze — bez niej nie byłoby ani cienia zgodnego
 *     z kształtem, ani eksportu do AR,
 *   - cień rzucany na ścianę: przy montażu na dystansach odsuwa się
 *     proporcjonalnie do wysokości tulei. To jest ten moment, który sprzedaje
 *     dystanse lepiej niż jakikolwiek akapit,
 *   - analiza wykonalności z transformaty odległości (patrz ferro-mask.mjs).
 *
 * Plik użytkownika nie opuszcza przeglądarki. Wszystko — rasteryzacja,
 * wektoryzacja, pomiar najcieńszej linii — dzieje się lokalnie. Na serwer
 * idzie dopiero to, co użytkownik świadomie wyśle przyciskiem wyceny.
 */
import * as THREE from 'three';
import { analyze } from '/js/ferro-mask.mjs';

const root = document.getElementById('cfg');

/* ------------------------------------------------------------------ */
/*  Komunikaty w dwóch językach                                        */
/* ------------------------------------------------------------------ */
/* Język bierzemy z `<html lang>`, a nie ze ścieżki: to jedyne źródło,
   które na pewno zgadza się z tym, co widzi użytkownik, i działa tak samo
   pod `/konfigurator` i `/en/configurator`. */
const LANG = document.documentElement.lang === 'en' ? 'en' : 'pl';

const T = {
  pl: {
    engineFail: 'Nie udało się wczytać silnika 3D. Sprawdź połączenie albo opisz projekt w briefie.',
    noWebgl: 'Twoja przeglądarka nie obsługuje WebGL. Opisz projekt w briefie — doradzimy materiał i rozmiar.',
    shapeFail: 'Nie udało się odczytać kształtu z tego pliku. Spróbuj z PNG na przezroczystym tle albo z SVG.',
    readFail: 'Nie udało się odczytać tego pliku.',
    tooBig: 'Plik jest większy niż 12 MB. Do podglądu wystarczy lżejsza wersja — oryginał dosłać można mailem.',
    linkCopied: 'Link skopiowany. Zapisuje ustawienia, ale nie plik — plik zostaje w Twojej przeglądarce.',
    arPrep: 'Przygotowuję model…',
    sending: 'Wysyłam…',
    sendFail: 'Nie udało się wysłać. Napisz na kontakt@ferrostudio.pl albo zadzwoń: +48 730 009 902.',
    sendLabel: 'Wyślij projekt do wyceny',
    sampleLabel: 'Znak Ferro Studio (przykład)',
    textLabel: (t) => `Tekst: ${t}`,
    materials: {
      'stal-czarna': 'Stal czarna',
      'stal-nierdzewna': 'Stal nierdzewna',
      corten: 'Stal corten',
      aluminium: 'Aluminium',
      mosiadz: 'Mosiądz',
    },
    sum: {
      project: 'Projekt',
      material: 'Materiał',
      finish: 'Wykończenie',
      mount: 'Montaż',
      flat: 'płasko na ścianie',
      standoff: (mm) => `dystanse ${mm} mm`,
      width: 'Szerokość',
      thinnest: 'Najcieńszy element w pliku: ok.',
      thinnestNone: 'Najcieńszy element: nie zmierzono',
      light: 'Światło w podglądzie',
    },
  },
  en: {
    engineFail: 'The 3D engine could not be loaded. Check your connection, or describe the project in the brief.',
    noWebgl: 'Your browser does not support WebGL. Describe the project in the brief — we will advise on material and size.',
    shapeFail: 'Could not read a shape from this file. Try a PNG on a transparent background, or an SVG.',
    readFail: 'Could not read this file.',
    tooBig: 'The file is larger than 12 MB. A lighter version is enough for the preview — you can email the original later.',
    linkCopied: 'Link copied. It saves the settings but not the file — the file stays in your browser.',
    arPrep: 'Preparing the model…',
    sending: 'Sending…',
    sendFail: 'Could not send. Write to kontakt@ferrostudio.pl or call +48 730 009 902.',
    sendLabel: 'Send the project for a quote',
    sampleLabel: 'Ferro Studio mark (example)',
    textLabel: (t) => `Text: ${t}`,
    materials: {
      'stal-czarna': 'Mild steel',
      'stal-nierdzewna': 'Stainless steel',
      corten: 'Corten steel',
      aluminium: 'Aluminium',
      mosiadz: 'Brass',
    },
    sum: {
      project: 'Project',
      material: 'Material',
      finish: 'Finish',
      mount: 'Mounting',
      flat: 'flush against the wall',
      standoff: (mm) => `${mm} mm standoffs`,
      width: 'Width',
      thinnest: 'Thinnest element in the file: approx.',
      thinnestNone: 'Thinnest element: not measured',
      light: 'Preview lighting',
    },
  },
}[LANG];

/* ------------------------------------------------------------------ */
/*  Katalog materiałów i wykończeń — wygląd, nie specyfikacja           */
/* ------------------------------------------------------------------ */
/* Wartości poniżej opisują, jak powierzchnia ODBIJA ŚWIATŁO w podglądzie.
   To parametry renderingu, nie deklaracje techniczne warsztatu — te ostatnie
   idą wyłącznie przez DataSlot. Tekstury generujemy proceduralnie, co brief
   dopuszcza wprost (1.4): grafika abstrakcyjna, nie dokumentacja rzeczywistości.
   Po dostarczeniu realnych skanów (sloty tex-*) podmienia się tu mapy. */
const LOOK = {
  'stal-czarna': { color: 0x4c4740, metalness: 0.8, roughness: 0.52, tex: 'mottle' },
  'stal-nierdzewna': { color: 0x9ba1a6, metalness: 0.95, roughness: 0.3, tex: 'brush' },
  corten: { color: 0x8b4a2b, metalness: 0.32, roughness: 0.8, tex: 'patina' },
  aluminium: { color: 0xb6b9ba, metalness: 0.72, roughness: 0.44, tex: 'fine' },
  mosiadz: { color: 0xb08d57, metalness: 0.95, roughness: 0.26, tex: 'fine' },
};

const FINISH = {
  raw: (m) => m,
  grain: (m) => ({ ...m, roughness: 0.22, tex: 'brush' }),
  patina: (m) => ({ ...m, color: 0x8a4526, metalness: 0.22, roughness: 0.88, tex: 'patina' }),
  coat: (m, ral) => ({ ...m, color: ral, metalness: 0.06, roughness: 0.62, tex: 'fine' }),
  noir: (m) => ({ ...m, color: 0x16140f, metalness: 0.55, roughness: 0.72, tex: 'mottle' }),
  brass: (m) => ({ ...m, color: 0xb08d57, metalness: 0.95, roughness: 0.24, tex: 'fine' }),
  lakier: (m) => ({ ...m, roughness: Math.max(0.1, m.roughness - 0.18) }),
};

/** Wysokość dystansu w metrach. 0 = płasko na ścianie. */
const MOUNT = { 0: 0, 15: 0.015, 25: 0.025, 40: 0.04 };

/** Grubość blachy w podglądzie. Celowo stała i nienazwana liczbą na stronie —
 *  realną grubość dobieramy do rozmiaru i materiału na etapie wyceny. */
const PLATE = 0.003;

/* ------------------------------------------------------------------ */
/*  Stan                                                               */
/* ------------------------------------------------------------------ */
const state = {
  material: 'stal-czarna',
  finish: 'raw',
  mount: 25,
  size: 1200,
  az: -28,
  temp: 4200,
  ral: '#3d4a52',
  text: '',
};

const PARAM = { material: 'm', finish: 'w', mount: 'd', size: 's', az: 'k', temp: 't', ral: 'c', text: 'x' };

function readUrl() {
  const q = new URLSearchParams(location.search);
  for (const [key, short] of Object.entries(PARAM)) {
    const v = q.get(short);
    if (v === null) continue;
    if (key === 'size' || key === 'az' || key === 'temp' || key === 'mount') {
      const n = Number(v);
      if (Number.isFinite(n)) state[key] = n;
    } else {
      state[key] = v;
    }
  }
  if (!LOOK[state.material]) state.material = 'stal-czarna';
  if (!(state.mount in MOUNT)) state.mount = 25;
  state.size = Math.min(3000, Math.max(200, state.size));
}

function shareUrl() {
  const q = new URLSearchParams();
  for (const [key, short] of Object.entries(PARAM)) {
    if (key === 'text' && !state.text) continue;
    q.set(short, String(state[key]));
  }
  return `${location.origin}${location.pathname}?${q}`;
}

/* ------------------------------------------------------------------ */
/*  Tekstury proceduralne                                              */
/* ------------------------------------------------------------------ */
const texCache = new Map();

/** Bok tekstury. 512 zamiast 1024: powierzchnia i tak jest kafelkowana, więc
 *  różnicy nie widać, a generowanie ziarna to pętla po każdym pikselu — na
 *  telefonie 1024² kosztowało cztery razy tyle za zerowy zysk wizualny. */
const TEX = 512;

function surfaceTexture(kind, renderer) {
  if (texCache.has(kind)) return texCache.get(kind);
  const c = document.createElement('canvas');
  c.width = TEX;
  c.height = TEX;
  const g = c.getContext('2d');

  if (kind === 'brush') {
    // Szczotkowanie: jednokierunkowe rysy, tak jak przy Ferro Grain.
    g.fillStyle = '#9a9a9a';
    g.fillRect(0, 0, TEX, TEX);
    for (let i = 0; i < 6000; i++) {
      const y = Math.random() * TEX;
      const len = 40 + Math.random() * 300;
      const x = Math.random() * TEX - len / 2;
      const v = 110 + Math.random() * 90;
      g.strokeStyle = `rgba(${v},${v},${v},${0.03 + Math.random() * 0.07})`;
      g.lineWidth = Math.random() < 0.85 ? 1 : 2;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + len, y + (Math.random() - 0.5) * 1.4);
      g.stroke();
    }
  } else if (kind === 'patina') {
    // Patyna: plamy o różnej skali, bez powtarzalnego wzoru.
    g.fillStyle = '#b4b4b4';
    g.fillRect(0, 0, TEX, TEX);
    for (let i = 0; i < 1300; i++) {
      const r = 2 + Math.random() * 35;
      const v = 120 + Math.random() * 120;
      g.fillStyle = `rgba(${v},${v},${v},${0.05 + Math.random() * 0.14})`;
      g.beginPath();
      g.arc(Math.random() * TEX, Math.random() * TEX, r, 0, Math.PI * 2);
      g.fill();
    }
  } else if (kind === 'mottle') {
    g.fillStyle = '#8c8c8c';
    g.fillRect(0, 0, TEX, TEX);
    for (let i = 0; i < 900; i++) {
      const r = 5 + Math.random() * 45;
      const v = 100 + Math.random() * 90;
      g.fillStyle = `rgba(${v},${v},${v},0.05)`;
      g.beginPath();
      g.arc(Math.random() * TEX, Math.random() * TEX, r, 0, Math.PI * 2);
      g.fill();
    }
  } else {
    // fine — drobne ziarno, żeby powierzchnia nie była idealnie gładka
    const img = g.createImageData(TEX, TEX);
    for (let i = 0; i < TEX * TEX; i++) {
      const v = 150 + ((Math.random() * 32) | 0);
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }

  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(kind === 'brush' ? 3 : 2, kind === 'brush' ? 1.5 : 2);
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texCache.set(kind, t);
  return t;
}

/** Kelwiny → RGB (przybliżenie Tannera Hellanda). Metal zmienia charakter
 *  razem z temperaturą światła i to jest argument sprzedażowy, nie ozdoba. */
function kelvinToColor(k) {
  const t = k / 100;
  let r;
  let g;
  let b;
  if (t <= 66) {
    r = 255;
    g = 99.47 * Math.log(t) - 161.12;
    b = t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04;
  } else {
    r = 329.7 * Math.pow(t - 60, -0.1332);
    g = 288.12 * Math.pow(t - 60, -0.0755);
    b = 255;
  }
  const cl = (v) => Math.min(255, Math.max(0, v)) / 255;
  return new THREE.Color(cl(r), cl(g), cl(b)).convertSRGBToLinear();
}

/* ------------------------------------------------------------------ */
/*  Główna funkcja                                                     */
/* ------------------------------------------------------------------ */
async function boot() {
  const $ = (id) => document.getElementById(id);
  const stage = $('cfg-stage');
  const loader = $('cfg-loader');
  const fallback = $('cfg-fallback');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finishMapEl = $('cfg-finish-map');
  const FINISH_BY_MATERIAL = finishMapEl ? JSON.parse(finishMapEl.textContent) : {};
  const minDetalMm = Number(root.dataset.minDetal) || null;

  const fail = (msg) => {
    loader?.remove();
    if (fallback) {
      fallback.hidden = false;
      const p = fallback.querySelector('[data-reason]');
      if (p && msg) p.textContent = msg;
    }
  };

  readUrl();

  let THREEX;
  try {
    const CDN = '/vendor/three/jsm';
    const [{ RoomEnvironment }, { RectAreaLightUniformsLib }, { GLTFExporter }] = await Promise.all([
      import(`${CDN}/environments/RoomEnvironment.js`),
      import(`${CDN}/lights/RectAreaLightUniformsLib.js`),
      import(`${CDN}/exporters/GLTFExporter.js`),
    ]);
    THREEX = { RoomEnvironment, RectAreaLightUniformsLib, GLTFExporter };
  } catch {
    fail(T.engineFail);
    return;
  }

  /* --- renderer ---------------------------------------------------- */
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch {
    fail(T.noWebgl);
    return;
  }

  const size = () => ({ w: stage.clientWidth, h: stage.clientHeight });
  let { w, h } = size();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, w < 700 ? 1.6 : 2));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x22201d);
  const camera = new THREE.PerspectiveCamera(38, w / h, 0.05, 60);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new THREEX.RoomEnvironment(), 0.04).texture;

  /* --- ściana ------------------------------------------------------ */
  // Jasny tynk, matowy. Ma być tłem dla metalu i ekranem dla cienia.
  // Równomierna płaszczyzna czyta się jak tło w programie graficznym, więc
  // dokładamy delikatne wygaszenie ku brzegom i ziarno tynku — tyle, żeby
  // scena wyglądała na pomieszczenie, i ani trochę więcej.
  function wallTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 1024;
    const g = c.getContext('2d');
    const rad = g.createRadialGradient(460, 390, 40, 512, 512, 620);
    rad.addColorStop(0, '#f2eee6');
    rad.addColorStop(0.38, '#e2ddd3');
    rad.addColorStop(0.72, '#c3bdb2');
    rad.addColorStop(1, '#948e84');
    g.fillStyle = rad;
    g.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 26000; i++) {
      const v = Math.random() < 0.5 ? 255 : 0;
      g.fillStyle = `rgba(${v},${v},${v},0.028)`;
      g.fillRect(Math.random() * 1024, Math.random() * 1024, 2, 2);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  const wallMap = wallTexture();
  const wall = new THREE.Mesh(
    // Kwadrat, żeby wygaszenie na teksturze zostało kołowe, a nie owalne.
    new THREE.PlaneGeometry(16, 16),
    new THREE.MeshStandardMaterial({ map: wallMap, roughness: 0.95, metalness: 0 })
  );
  scene.add(wall);

  /* Cień łapie osobna płaszczyzna z `ShadowMaterial`, a nie sama ściana.
     Powód jest praktyczny: metal potrzebuje dużych źródeł powierzchniowych,
     żeby w ogóle mieć kolor, a te same źródła rozjaśniają ścianę dokładnie
     tam, gdzie ma leżeć cień. `ShadowMaterial` przyciemnia obszar zacienienia
     niezależnie od reszty oświetlenia, więc jedno nie kasuje drugiego.

     (Warstwy `Object3D.layers` tego nie rozwiązują: three sprawdza warstwę
     światła względem KAMERY, nie oświetlanego obiektu, więc światło zdjęte
     z warstwy 0 po prostu przestaje działać.) */
  const shadowCatcher = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    new THREE.ShadowMaterial({ opacity: 0.5 })
  );
  shadowCatcher.position.z = 0.002;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

  /* --- światło ----------------------------------------------------- */
  /* Metal o `metalness` bliskim 1 nie ma własnego koloru rozproszonego —
     bierze go w całości z odbić. Sama mapa środowiska z RoomEnvironment jest
     na to za ciemna i nierdzewka wychodzi czarna. Dlatego, dokładnie jak
     w hero, pracują tu dwa duże źródła powierzchniowe: to one dają metalowi
     rozciągnięty refleks zamiast punktowej kropki. */
  THREEX.RectAreaLightUniformsLib.init();

  scene.add(new THREE.AmbientLight(0xf0e8dc, 0.3));

  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.004;
  key.shadow.radius = 3;
  scene.add(key, key.target);

  const softCool = new THREE.RectAreaLight(0xdfe8ff, 2.3, 6, 4);
  scene.add(softCool);

  const softWarm = new THREE.RectAreaLight(0xffd8b0, 1.6, 5, 3);
  scene.add(softWarm);

  // Kontra od dołu-boku: bez niej krawędź blachy ginie na jasnej ścianie
  // i element traci grubość.
  const rim = new THREE.DirectionalLight(0xffe6c8, 0.6);
  rim.position.set(2.5, -2, 1.2);
  scene.add(rim);

  /* --- element ----------------------------------------------------- */
  const piece = new THREE.Group();
  scene.add(piece);

  let mesh = null;
  let analysis = null;
  let sourceFile = null;
  let sourceLabel = 'Znak Ferro Studio';
  /** Największy wymiar elementu w metrach i wynikający z niego dystans kamery. */
  let span = 1.2;
  let camDist = 2.2;

  const material = new THREE.MeshStandardMaterial({ color: 0x4c4740, metalness: 0.8, roughness: 0.52 });

  function applyLook() {
    const base = LOOK[state.material] ?? LOOK['stal-czarna'];
    const fx = FINISH[state.finish] ?? FINISH.raw;
    const look = fx(base, new THREE.Color(state.ral).getHex());
    material.color.set(look.color);
    material.metalness = look.metalness;
    material.roughness = look.roughness;
    material.roughnessMap = surfaceTexture(look.tex, renderer);
    // Im bardziej metaliczna powierzchnia, tym mniej ma własnego koloru
    // i tym mocniej musi widzieć otoczenie.
    material.envMapIntensity = look.metalness > 0.5 ? 1.9 : 1.0;
    material.needsUpdate = true;
  }

  /** Kontury z maski → bryła. Skala liczona tak, żeby szerokość bryły
   *  odpowiadała szerokości zamawianego elementu w metrach. */
  function rebuildMesh() {
    if (mesh) {
      piece.remove(mesh);
      mesh.geometry.dispose();
      mesh = null;
    }
    if (!analysis?.polygons?.length) return;

    const shapes = analysis.polygons.map(({ outer, holes }) => {
      const s = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2(x, y)));
      for (const hole of holes) {
        s.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))));
      }
      return s;
    });

    // Bez fazowania: laser zostawia krawędź prostopadłą, a `bevelEnabled`
    // na uproszczonym, miejscami ząbkowanym konturze potrafi wywrócić
    // triangulację. Prawda o procesie i stabilność idą tu w tę samą stronę.
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 1,
      bevelEnabled: false,
      curveSegments: 1,
    });
    geo.center();

    mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    piece.add(mesh);
    layoutPiece();
  }

  /**
   * Kadr liczony z frustum, nie ze stałej odległości.
   *
   * Element ma zajmować ok. 55% szerokości kadru — reszta to ściana. Bez tego
   * marginesu podgląd przestaje pokazywać rzecz NA ŚCIANIE i zaczyna pokazywać
   * grafikę na tle, a wtedy traci całą wartość dowodową przy ocenie skali.
   */
  let lastFrame = { w: 1.2, h: 0.4 };
  function frameCamera(widthM = lastFrame.w, heightM = lastFrame.h) {
    lastFrame = { w: widthM, h: heightM };
    const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
    const distH = heightM / 0.5 / (2 * Math.tan(halfFov));
    const distW = widthM / 0.55 / (2 * Math.tan(halfFov) * Math.max(0.4, camera.aspect));
    camDist = Math.max(0.55, distW, distH);

    // Wygaszenie na ścianie skalujemy razem z kadrem. Stała skala tekstury
    // przy dużym elemencie zostawiałaby w kadrze sam jasny środek gradientu
    // i ściana znów byłaby płaską plamą.
    const visible = 2 * Math.tan(halfFov) * camDist * Math.max(1, camera.aspect) * 1.7;
    const r = 16 / visible;
    wallMap.repeat.set(r, r);
    wallMap.offset.set((1 - r) / 2, (1 - r) / 2);
  }

  function layoutPiece() {
    if (!mesh) return;
    const widthM = state.size / 1000;
    // Geometria powstaje w układzie o szerokości 1 — skala to wprost wymiar.
    mesh.scale.set(widthM, widthM, PLATE);
    piece.position.z = MOUNT[state.mount] + PLATE / 2 + 0.001;

    const heightM = widthM * (analysis?.aspect ?? 0.4);
    span = Math.max(widthM, heightM);
    frameCamera(widthM, heightM);

    // Ramka cienia dopasowana do elementu — stała ramka przy małym logo
    // daje cień rozmyty do niewidoczności, przy dużym ucina go w połowie.
    const r = span * 1.1 + 0.2;
    key.shadow.camera.left = -r;
    key.shadow.camera.right = r;
    key.shadow.camera.top = r;
    key.shadow.camera.bottom = -r;
    key.shadow.camera.near = 0.05;
    key.shadow.camera.far = span * 8 + 4;
    key.shadow.camera.updateProjectionMatrix();

    applyLight();
  }

  function applyLight() {
    const rad = (state.az * Math.PI) / 180;
    const d = span * 2.6 + 1.2;
    key.position.set(Math.sin(rad) * d, Math.cos(rad * 0.35) * d * 0.55 + 0.35, d * 0.9);
    key.target.position.set(0, 0, 0);
    key.target.updateMatrixWorld();
    key.color.copy(kelvinToColor(state.temp));

    // Softboksy jadą za suwakiem kierunku razem z kluczem — inaczej refleks
    // na metalu stałby w miejscu, kiedy cień się przesuwa, i całość
    // rozjeżdżałaby się na oczach.
    //
    // Płaska blacha zwrócona do kamery odbija to, co stoi ZA kamerą — źródło
    // ustawione z boku po prostu nie trafia w kadr i nierdzewka wychodzi
    // czarna. Dlatego główny softboks stoi blisko osi patrzenia, tak jak
    // w realnej fotografii produktowej, a suwak kierunku przesuwa go w bok,
    // przeciągając refleks po powierzchni.
    const front = camDist * 0.85;
    softCool.width = span * 4 + 1.5;
    softCool.height = span * 3 + 1.2;
    softCool.position.set(Math.sin(rad) * (span * 1.5 + 0.5), span * 1.1 + 0.4, front);
    softCool.lookAt(0, 0, 0);
    softCool.color.copy(kelvinToColor(Math.min(6500, state.temp + 900)));

    // Drugi, cieplejszy — z dołu i z boku, żeby powierzchnia nie była
    // jednolitą płachtą jednego refleksu.
    softWarm.width = span * 2.6 + 0.8;
    softWarm.height = span * 1.8 + 0.6;
    softWarm.position.set(-Math.sin(rad) * (span * 1.6 + 0.6), -(span * 0.9 + 0.3), front * 0.75);
    softWarm.lookAt(0, 0, 0);
    softWarm.color.copy(kelvinToColor(Math.max(2700, state.temp - 700)));

    rim.color.copy(kelvinToColor(Math.max(2700, state.temp - 900)));
  }

  /* --- wykonalność -------------------------------------------------- */
  const feasBox = $('cfg-feas');
  const feasVal = $('cfg-feas-val');
  const feasMsg = $('cfg-feas-msg');

  function updateFeasibility() {
    if (!feasBox) return;
    if (!analysis || analysis.minStrokePx == null) {
      feasBox.dataset.state = 'unknown';
      if (feasVal) feasVal.textContent = '—';
      return;
    }
    const mm = (analysis.minStrokePx / analysis.maskWidthPx) * state.size;
    const shown = mm < 10 ? mm.toFixed(1) : String(Math.round(mm));
    if (feasVal) feasVal.textContent = `${shown.replace('.', ',')} mm`;

    if (!minDetalMm) {
      feasBox.dataset.state = 'nothreshold';
      return;
    }
    const tight = mm < minDetalMm;
    feasBox.dataset.state = tight ? 'warn' : 'ok';
    if (feasMsg && tight) {
      const need = Math.ceil((minDetalMm / mm) * state.size);
      feasMsg.textContent =
        `Poniżej ${minDetalMm} mm nie wytniemy go czysto — zwiększ rozmiar do ok. ${need} mm albo pogrub linie w pliku.`;
    }
  }

  /* --- wczytanie źródła --------------------------------------------- */
  const nameEl = $('cfg-filename');
  const busy = (on) => root.classList.toggle('is-busy', on);

  async function loadSource(source, label) {
    busy(true);
    try {
      const res = await analyze(source);
      if (!res || !res.polygons.length) {
        setStatus(T.shapeFail, true);
        return false;
      }
      analysis = res;
      sourceLabel = label;
      if (nameEl) nameEl.textContent = label;
      rebuildMesh();
      updateFeasibility();
      setStatus('');
      return true;
    } catch {
      setStatus(T.readFail, true);
      return false;
    } finally {
      busy(false);
    }
  }

  /* --- pętla renderowania -------------------------------------------- */
  /* Przeciąganie obraca KAMERĘ wokół ściany, nie element. Obracany element
     odklejałby się od ściany — a cały sens tego podglądu polega na tym,
     że pokazuje rzecz wiszącą na ścianie, nie unoszącą się w próżni. */
  let yaw = 0.22;
  let pitch = 0.07;
  let tgtYaw = 0.22;
  let tgtPitch = 0.07;
  let dragging = false;
  let last = null;
  const el = renderer.domElement;

  el.addEventListener('pointerdown', (e) => {
    dragging = true;
    last = { x: e.clientX, y: e.clientY };
    el.setPointerCapture?.(e.pointerId);
    el.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging || !last) return;
    // Zakres celowo wąski: to podgląd elementu na ścianie, nie orbita wokół
    // obiektu w próżni. Za ścianę nie da się zajrzeć.
    tgtYaw = THREE.MathUtils.clamp(tgtYaw - (e.clientX - last.x) * 0.005, -0.75, 0.75);
    tgtPitch = THREE.MathUtils.clamp(tgtPitch + (e.clientY - last.y) * 0.004, -0.35, 0.4);
    last = { x: e.clientX, y: e.clientY };
  });
  const stop = () => {
    dragging = false;
    last = null;
    el.classList.remove('is-dragging');
  };
  window.addEventListener('pointerup', stop);
  window.addEventListener('pointercancel', stop);

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(stage);

  function resize() {
    const s = size();
    if (!s.w || !s.h) return;
    camera.aspect = s.w / s.h;
    camera.updateProjectionMatrix();
    renderer.setSize(s.w, s.h);
    frameCamera();
    applyLight(); // dystans źródeł zależy od kadru, więc musi przeliczyć się razem z nim
  }
  window.addEventListener('resize', resize);

  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    if (reduceMotion) {
      yaw = tgtYaw;
      pitch = tgtPitch;
    } else {
      yaw += (tgtYaw - yaw) * 0.09;
      pitch += (tgtPitch - pitch) * 0.09;
    }
    camera.position.set(
      Math.sin(yaw) * Math.cos(pitch) * camDist,
      Math.sin(pitch) * camDist,
      Math.cos(yaw) * Math.cos(pitch) * camDist
    );
    camera.lookAt(0, 0, MOUNT[state.mount] * 0.5);
    renderer.render(scene, camera);
  }

  /* --- podpięcie interfejsu ------------------------------------------ */
  const sizeInput = $('cfg-size');
  const sizeOut = $('cfg-size-out');
  const azInput = $('cfg-az');
  const tempInput = $('cfg-temp');
  const ralInput = $('cfg-ral');
  const ralRow = $('cfg-ral-row');
  const scaleFig = document.querySelector('#cfg .sf');
  const statusEl = $('cfg-status');

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.hidden = !msg;
    statusEl.dataset.tone = isError ? 'error' : 'info';
  }

  function syncButtons(group) {
    document.querySelectorAll(`[data-opt="${group}"]`).forEach((b) => {
      const on = String(b.dataset.value) === String(state[group]);
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /** Wykończenia dostępne dla wybranego materiału — jedno źródło prawdy
   *  siedzi w src/data/finishes.ts i przyjeżdża tu jako JSON. */
  function syncFinishes() {
    const allowed = FINISH_BY_MATERIAL[state.material] ?? [];
    let firstAllowed = null;
    document.querySelectorAll('[data-opt="finish"]').forEach((b) => {
      const ok = allowed.includes(b.dataset.value);
      b.hidden = !ok;
      if (ok && !firstAllowed) firstAllowed = b.dataset.value;
    });
    if (!allowed.includes(state.finish)) state.finish = firstAllowed ?? 'raw';
    if (ralRow) ralRow.hidden = state.finish !== 'coat';
    syncButtons('finish');
  }

  function syncAll({ rebuild = false } = {}) {
    syncButtons('material');
    syncButtons('mount');
    syncFinishes();
    if (sizeInput) sizeInput.value = String(state.size);
    if (sizeOut) sizeOut.textContent = `${state.size} mm`;
    if (azInput) azInput.value = String(state.az);
    if (tempInput) tempInput.value = String(state.temp);
    if (ralInput) ralInput.value = state.ral;
    if (scaleFig) scaleFig.dataset.mm = String(state.size);
    applyLook();
    if (rebuild) rebuildMesh();
    else layoutPiece();
    updateFeasibility();
    history.replaceState(null, '', shareUrl());
  }

  document.querySelectorAll('[data-opt]').forEach((b) => {
    b.addEventListener('click', () => {
      const group = b.dataset.opt;
      const raw = b.dataset.value;
      state[group] = group === 'mount' ? Number(raw) : raw;
      syncAll();
    });
  });

  sizeInput?.addEventListener('input', () => {
    state.size = Number(sizeInput.value);
    if (sizeOut) sizeOut.textContent = `${state.size} mm`;
    if (scaleFig) scaleFig.dataset.mm = String(state.size);
    layoutPiece();
    updateFeasibility();
  });
  sizeInput?.addEventListener('change', () => history.replaceState(null, '', shareUrl()));

  azInput?.addEventListener('input', () => {
    state.az = Number(azInput.value);
    applyLight();
  });
  tempInput?.addEventListener('input', () => {
    state.temp = Number(tempInput.value);
    applyLight();
  });
  [azInput, tempInput].forEach((i) =>
    i?.addEventListener('change', () => history.replaceState(null, '', shareUrl()))
  );

  ralInput?.addEventListener('input', () => {
    state.ral = ralInput.value;
    applyLook();
  });
  ralInput?.addEventListener('change', () => history.replaceState(null, '', shareUrl()));

  /* --- upload -------------------------------------------------------- */
  const drop = $('cfg-drop');
  const fileInput = $('cfg-file');
  const textInput = $('cfg-text');

  async function takeFile(file) {
    if (!file) return;
    if (file.size > 12 * 1024 * 1024) {
      setStatus(T.tooBig, true);
      return;
    }
    sourceFile = file;
    state.text = '';
    if (textInput) textInput.value = '';
    const ok = await loadSource(file, file.name);
    if (ok) history.replaceState(null, '', shareUrl());
  }

  fileInput?.addEventListener('change', () => takeFile(fileInput.files?.[0]));

  if (drop) {
    ['dragenter', 'dragover'].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.add('is-over');
      })
    );
    ['dragleave', 'drop'].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.remove('is-over');
      })
    );
    drop.addEventListener('drop', (e) => takeFile(e.dataTransfer?.files?.[0]));
  }

  let textTimer = 0;
  textInput?.addEventListener('input', () => {
    clearTimeout(textTimer);
    textTimer = window.setTimeout(async () => {
      const v = textInput.value.trim();
      if (!v) return;
      sourceFile = null;
      state.text = v;
      await loadSource(v, `Tekst: ${v}`);
      history.replaceState(null, '', shareUrl());
    }, 400);
  });

  /* --- udostępnianie -------------------------------------------------- */
  $('cfg-share')?.addEventListener('click', async () => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setStatus(T.linkCopied);
    } catch {
      setStatus(`Skopiuj link ręcznie: ${url}`);
    }
  });

  /* --- eksport modelu i AR -------------------------------------------- */
  async function exportGlb() {
    if (!mesh) return null;
    const clone = mesh.clone();
    clone.geometry = mesh.geometry.clone();
    clone.scale.copy(mesh.scale);
    clone.updateMatrixWorld(true);
    const exporter = new THREEX.GLTFExporter();
    const bin = await exporter.parseAsync(clone, { binary: true });
    clone.geometry.dispose();
    return new Blob([bin], { type: 'model/gltf-binary' });
  }

  $('cfg-glb')?.addEventListener('click', async () => {
    const blob = await exportGlb();
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ferro-${state.material}-${state.size}mm.glb`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });

  const arBtn = $('cfg-ar');
  const arModal = $('cfg-ar-modal');
  const arHost = $('cfg-ar-host');
  const arNote = $('cfg-ar-note');
  let mvLoaded = false;

  arBtn?.addEventListener('click', async () => {
    if (!arModal || !arHost) return;
    arModal.hidden = false;
    arHost.textContent = T.arPrep;

    if (!mvLoaded) {
      // model-viewer wyłącznie tutaj i wyłącznie po kliknięciu — na stronie,
      // która się nie otwiera, nie ma prawa kosztować ani bajta (brief 16).
      await new Promise((res, rej) => {
        const s = document.createElement('script');
        s.type = 'module';
        s.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
      }).catch(() => null);
      mvLoaded = true;
    }

    const blob = await exportGlb();
    if (!blob) {
      arHost.textContent = 'Najpierw wgraj plik albo wpisz tekst.';
      return;
    }
    const url = URL.createObjectURL(blob);
    arHost.innerHTML = '';
    const mv = document.createElement('model-viewer');
    mv.setAttribute('src', url);
    mv.setAttribute('ar', '');
    mv.setAttribute('ar-modes', 'webxr scene-viewer');
    mv.setAttribute('ar-scale', 'fixed');
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('shadow-intensity', '1');
    mv.setAttribute('alt', `Podgląd 3D: ${sourceLabel}, ${state.size} mm`);
    mv.style.width = '100%';
    mv.style.height = '100%';
    arHost.appendChild(mv);

    if (arNote && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      arNote.hidden = false;
    }
  });

  $('cfg-ar-close')?.addEventListener('click', () => {
    if (!arModal || !arHost) return;
    arModal.hidden = true;
    arHost.innerHTML = '';
  });
  arModal?.addEventListener('click', (e) => {
    if (e.target === arModal) $('cfg-ar-close')?.click();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && arModal && !arModal.hidden) $('cfg-ar-close')?.click();
  });

  /* --- wysyłka do wyceny ---------------------------------------------- */
  const form = $('cfg-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('cfg-send');
    const fd = new FormData(form);

    const S = T.sum;
    fd.set(
      'konfiguracja',
      [
        `${S.project}: ${sourceLabel}`,
        `${S.material}: ${T.materials[state.material] ?? state.material}`,
        `${S.finish}: ${state.finish}${state.finish === 'coat' ? ` (${state.ral})` : ''}`,
        `${S.mount}: ${state.mount === 0 ? S.flat : S.standoff(state.mount)}`,
        `${S.width}: ${state.size} mm`,
        analysis?.minStrokePx != null
          ? `${S.thinnest} ${(((analysis.minStrokePx / analysis.maskWidthPx) * state.size)).toFixed(1)} mm`
          : S.thinnestNone,
        `${S.light}: ${state.az}°, ${state.temp} K`,
      ].join('\n')
    );
    fd.set('link', shareUrl());

    // Zrzut sceny renderujemy tuż przed odczytem — bez preserveDrawingBuffer
    // bufor jest czyszczony po każdej klatce.
    try {
      renderer.render(scene, camera);
      const shot = await new Promise((res) => renderer.domElement.toBlob(res, 'image/jpeg', 0.85));
      if (shot) fd.set('podglad', shot, `ferro-podglad-${state.size}mm.jpg`);
    } catch {
      /* zrzut jest miły, ale nie jest warunkiem wysłania briefu */
    }
    if (sourceFile) fd.set('projekt', sourceFile, sourceFile.name);

    if (btn) {
      btn.disabled = true;
      btn.classList.add('is-sending');
      btn.dataset.label = btn.textContent;
      btn.textContent = T.sending;
    }

    try {
      const res = await fetch(form.action, { method: 'POST', body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error();
      form.hidden = true;
      const done = $('cfg-done');
      if (done) done.hidden = false;
    } catch {
      setStatus(
        T.sendFail,
        true
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('is-sending');
        btn.textContent = btn.dataset.label ?? T.sendLabel;
      }
    }
  });

  /* --- start ---------------------------------------------------------- */
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]);
  } catch {
    /* brak fontu zmienia tylko wygląd trybu tekstowego */
  }

  if (state.text) {
    if (textInput) textInput.value = state.text;
    await loadSource(state.text, `Tekst: ${state.text}`);
  } else {
    // Domyślny kadr to znak marki — konfigurator pokazuje, co potrafi,
    // zanim użytkownik cokolwiek wgra.
    try {
      const img = new Image();
      img.src = '/logo2.png';
      await img.decode();
      const file = await fetch('/logo2.png').then((r) => r.blob());
      await loadSource(file, T.sampleLabel);
    } catch {
      await loadSource('FERRO', T.textLabel('FERRO'));
    }
  }

  syncAll({ rebuild: false });
  resize();
  frame();
  loader?.classList.add('is-done');
  setTimeout(() => loader?.remove(), 500);
  root.classList.add('is-ready');
}

/* Start dopiero tutaj: `boot` czyta stałe modułu zadeklarowane wyżej, więc
   wywołanie z góry pliku trafiałoby w martwą strefę czasową. */
if (root) boot();
