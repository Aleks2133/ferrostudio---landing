/**
 * Scrollytelling procesu — „od pliku do ściany" (brief 11.C).
 *
 * Sześć etapów sterowanych pozycją scrolla. Kluczowa zasada, z której wynika
 * cała reszta: **scroll to posuw głowicy**. Zatrzymujesz przewijanie — laser
 * staje. To jest ten rodzaj ruchu, który Awwwards nazywa ukierunkowanym:
 * animacja niesie informację, zamiast ją zdobić. Sprzedaje kompetencję
 * i technologię naraz.
 *
 * Bez GSAP i bez ScrollTrigger: `IntersectionObserver` decyduje, czy scena
 * w ogóle żyje, a zwykły odczyt `getBoundingClientRect()` daje postęp 0–1.
 * Przy `prefers-reduced-motion` scena nie wstaje wcale — zostaje sam tekst,
 * który i tak niesie pełną treść.
 */
import * as THREE from 'three';
import { analyze } from '/js/ferro-mask.mjs';

const root = document.getElementById('proc');
const host = document.getElementById('proc-canvas');

/** Granice etapów w globalnym postępie 0–1. */
const STAGE = [0, 0.16, 0.32, 0.58, 0.71, 0.86, 1];

/** Znormalizowany postęp wewnątrz etapu `i`. */
const at = (p, i) => THREE.MathUtils.clamp((p - STAGE[i]) / (STAGE[i + 1] - STAGE[i]), 0, 1);

const ease = (x) => 1 - Math.pow(1 - x, 3);

async function boot() {
  const CDN = '/vendor/three/jsm';
  const [{ RoomEnvironment }] = await Promise.all([import(`${CDN}/environments/RoomEnvironment.js`)]);

  const size = () => ({ w: host.clientWidth, h: host.clientHeight });
  let { w, h } = size();
  if (!w || !h) return;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.localClippingEnabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121110);
  const camera = new THREE.PerspectiveCamera(38, w / h, 0.05, 60);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* --- geometria z realnego pliku --------------------------------- */
  const res = await analyze(await fetch('/logo2.png').then((r) => r.blob()), 384);
  if (!res?.polygons.length) return;

  const shapes = res.polygons.map(({ outer, holes }) => {
    const s = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2(x, y)));
    for (const hole of holes) s.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))));
    return s;
  });

  /* --- 1. kontury ------------------------------------------------- */
  /* Etap „plik": ścieżki rysują się od zera. Wierzchołki idą do jednego
     bufora w kolejności obiegu, więc `drawRange` wystarcza za całą animację. */
  const linePts = [];
  for (const { outer, holes } of res.polygons) {
    for (const ring of [outer, ...holes]) {
      for (let i = 0; i < ring.length; i++) {
        const a = ring[i];
        const b = ring[(i + 1) % ring.length];
        linePts.push(a[0], a[1], 0, b[0], b[1], 0);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xd9642e, transparent: true });
  const contour = new THREE.LineSegments(lineGeo, lineMat);
  const TOTAL_VERTS = linePts.length / 3;
  scene.add(contour);

  /* --- 2. arkusz i detal ------------------------------------------ */
  const SHEET_W = 1.9;
  const SHEET_H = SHEET_W * 0.62;

  const sheetOutline = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(SHEET_W, SHEET_H)),
    new THREE.LineBasicMaterial({ color: 0x6f6a61, transparent: true, opacity: 0 })
  );
  scene.add(sheetOutline);

  const sheet = new THREE.Mesh(
    new THREE.BoxGeometry(SHEET_W, SHEET_H, 0.006),
    new THREE.MeshStandardMaterial({ color: 0x2e2a26, metalness: 0.9, roughness: 0.55, transparent: true, opacity: 0 })
  );
  scene.add(sheet);

  // Płaszczyzna tnąca wędruje z głowicą: detal istnieje tylko tam, gdzie
  // wiązka już przeszła.
  const clip = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);

  const partMat = new THREE.MeshStandardMaterial({
    color: 0x6a6058,
    metalness: 0.9,
    roughness: 0.42,
    envMapIntensity: 2.2,
    clippingPlanes: [clip],
    clipShadows: true,
  });

  const partGeo = new THREE.ExtrudeGeometry(shapes, { depth: 1, bevelEnabled: false, curveSegments: 1 });
  partGeo.center();
  const PART_W = 1.25;
  const part = new THREE.Mesh(partGeo, partMat);
  part.scale.set(PART_W, PART_W, 0.006);
  part.castShadow = true;
  scene.add(part);

  /* --- 3. wiązka i iskry ------------------------------------------ */
  const beam = new THREE.Mesh(
    new THREE.PlaneGeometry(0.008, SHEET_H * 1.1),
    new THREE.MeshBasicMaterial({
      color: 0xfff1d6,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  scene.add(beam);

  const headLight = new THREE.PointLight(0xff8c3c, 0, 1.2, 2);
  scene.add(headLight);

  const SPARKS = 220;
  const sPos = new Float32Array(SPARKS * 3);
  const sCol = new Float32Array(SPARKS * 3);
  const sVel = new Float32Array(SPARKS * 3);
  const sLife = new Float32Array(SPARKS);
  let sAt = 0;

  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sparkGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      size: 0.014,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  sparks.frustumCulled = false;
  scene.add(sparks);

  function spawn(x, n) {
    for (let k = 0; k < n; k++) {
      const i = sAt;
      sAt = (sAt + 1) % SPARKS;
      sPos[i * 3] = x;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * SHEET_H * 0.75;
      sPos[i * 3 + 2] = 0.01;
      sVel[i * 3] = -0.15 - Math.random() * 0.7;
      sVel[i * 3 + 1] = -0.1 - Math.random() * 0.6;
      sVel[i * 3 + 2] = 0.2 + Math.random() * 0.8;
      sLife[i] = 0.35 + Math.random() * 0.4;
    }
  }

  function stepSparks(dt) {
    for (let i = 0; i < SPARKS; i++) {
      if (sLife[i] <= 0) {
        sCol[i * 3] = sCol[i * 3 + 1] = sCol[i * 3 + 2] = 0;
        continue;
      }
      sLife[i] -= dt;
      sVel[i * 3 + 1] -= 1.8 * dt;
      sPos[i * 3] += sVel[i * 3] * dt;
      sPos[i * 3 + 1] += sVel[i * 3 + 1] * dt;
      sPos[i * 3 + 2] += sVel[i * 3 + 2] * dt;
      const f = Math.max(0, sLife[i] / 0.6);
      sCol[i * 3] = 2.2 * f;
      sCol[i * 3 + 1] = 1.0 * f * f;
      sCol[i * 3 + 2] = 0.25 * f * f * f;
    }
    sparkGeo.attributes.position.needsUpdate = true;
    sparkGeo.attributes.color.needsUpdate = true;
  }

  /* --- 6. ściana --------------------------------------------------- */
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x1a1917, roughness: 0.95 });
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), wallMat);
  wall.position.z = -0.45;
  wall.receiveShadow = true;
  scene.add(wall);

  /* --- światło ------------------------------------------------------ */
  scene.add(new THREE.AmbientLight(0xffe9d2, 0.35));

  const key = new THREE.DirectionalLight(0xfff2e2, 2.2);
  key.position.set(-1.4, 1.6, 2.2);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.normalBias = 0.004;
  key.shadow.radius = 3;
  key.shadow.camera.left = -1.4;
  key.shadow.camera.right = 1.4;
  key.shadow.camera.top = 1.4;
  key.shadow.camera.bottom = -1.4;
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 8;
  key.shadow.camera.updateProjectionMatrix();
  scene.add(key);

  /* --- kolory wykończeń (etap 5) ------------------------------------ */
  const FINISH = [
    { color: new THREE.Color(0x6a6058), rough: 0.42 }, // surowe po cięciu
    { color: new THREE.Color(0x9ba1a6), rough: 0.24 }, // szczotkowane
    { color: new THREE.Color(0x8b4a2b), rough: 0.82 }, // patyna
  ];

  /* --- sterowanie postępem ------------------------------------------ */
  // Kolory hoistowane poza pętlę — `new THREE.Color()` w każdej klatce
  // to śmieci dla odśmiecacza w miejscu, które ma trzymać 60 fps.
  const WALL_DARK = new THREE.Color(0x1a1917);
  const WALL_LIT = new THREE.Color(0xd8d3ca);
  const BG_DARK = new THREE.Color(0x121110);
  const BG_LIT = new THREE.Color(0x2a2724);

  let progress = 0;

  function apply(p) {
    // 1. PLIK — ścieżki rysują się od zera
    const p1 = at(p, 0);
    const verts = Math.max(2, Math.floor(TOTAL_VERTS * ease(p1)));
    lineGeo.setDrawRange(0, verts - (verts % 2));
    lineMat.opacity = p < STAGE[2] ? 1 - at(p, 1) * 0.85 : 0;
    contour.visible = lineMat.opacity > 0.02;

    // 2. NESTING — kontur siada na arkuszu, arkusz się pojawia
    const p2 = at(p, 1);
    const k = THREE.MathUtils.lerp(PART_W, PART_W * 0.92, ease(p2));
    contour.scale.setScalar(k);
    contour.position.y = THREE.MathUtils.lerp(0, -0.02, ease(p2));
    sheet.material.opacity = ease(p2);
    // Obrys arkusza gaśnie razem z odpadem. Liczony w jednym miejscu z p2 i p4,
    // bo dekrementowanie własnej wartości co klatkę daje wynik zależny od fps.
    sheetOutline.material.opacity = ease(p2) * 0.8 * (1 - at(p, 3));

    // 3. CIĘCIE — scroll jest posuwem głowicy
    const p3 = at(p, 2);
    const cutX = (p3 - 0.5) * SHEET_W;
    // three renderuje tam, gdzie `normal · punkt + constant >= 0`.
    // Przy normalnej (-1,0,0) daje to −x + constant >= 0, czyli x <= constant.
    clip.constant = cutX;
    const cutting = p > STAGE[2] && p < STAGE[3];
    beam.position.x = cutX;
    beam.material.opacity = cutting ? 0.9 : 0;
    headLight.position.set(cutX, 0, 0.12);
    headLight.intensity = cutting ? 3.5 : 0;
    part.visible = p > STAGE[2];
    sheet.visible = p > STAGE[1];

    // 4. ODPAD ODPADA — arkusz przechyla się i znika, detal zostaje
    const p4 = at(p, 3);
    const g = p4 * p4;
    sheet.position.y = -g * 3.2;
    sheet.position.z = -g * 1.4;
    sheet.rotation.x = g * 1.1;
    if (p > STAGE[3]) sheet.material.opacity = Math.max(0, 1 - p4 * 1.8);
    // Obrys jest krawędzią TEGO arkusza — musi odpaść razem z nim, inaczej
    // zostaje w kadrze wisząca ramka po czymś, czego już nie ma.
    sheetOutline.position.copy(sheet.position);
    sheetOutline.rotation.copy(sheet.rotation);

    // 5. WYKOŃCZENIE — przejście materiału na tym samym meshu
    const p5 = at(p, 4) * (FINISH.length - 1);
    const i0 = Math.min(FINISH.length - 2, Math.floor(p5));
    const t = p5 - i0;
    partMat.color.copy(FINISH[i0].color).lerp(FINISH[i0 + 1].color, t);
    partMat.roughness = THREE.MathUtils.lerp(FINISH[i0].rough, FINISH[i0 + 1].rough, t);

    // 6. MONTAŻ — element ląduje na ścianie, dystanse rzucają cień
    const p6 = ease(at(p, 5));
    // Detal leży odrobinę PRZED arkuszem — przy identycznym z obie bryły
    // walczyłyby o piksele i litery pokrywałyby się prążkami.
    // Cień ma sens dopiero, gdy jest na co go rzucić. Wcześniej ściana stoi
    // w ciemności, a sylwetka na niej czytała się jak drugi, zduplikowany detal.
    part.castShadow = p > STAGE[5];
    part.position.z = THREE.MathUtils.lerp(0.006, -0.425, p6); // ~25 mm od ściany
    part.scale.set(PART_W, PART_W, THREE.MathUtils.lerp(0.006, 0.012, p6));
    wallMat.color.copy(WALL_DARK).lerp(WALL_LIT, p6);
    scene.background.copy(BG_DARK).lerp(BG_LIT, p6 * 0.8);

    // Kamera: z góry nad blachą przy cięciu, cofnięta i prosto przy montażu.
    const low = at(p, 2) > 0 && p < STAGE[4] ? 1 : 0;
    const camY = THREE.MathUtils.lerp(0.05, 0.5, low * (1 - p6));
    const camZ = THREE.MathUtils.lerp(2.1, 2.6, p6);
    camera.position.set(THREE.MathUtils.lerp(0, 0.25, p6), camY, camZ);
    camera.lookAt(0, 0, THREE.MathUtils.lerp(0, -0.2, p6));
  }

  function measure() {
    const r = root.getBoundingClientRect();
    const travel = r.height - window.innerHeight;
    progress = travel > 0 ? THREE.MathUtils.clamp(-r.top / travel, 0, 1) : 0;
  }

  function layout() {
    const s = size();
    if (!s.w || !s.h) return;
    camera.aspect = s.w / s.h;
    camera.updateProjectionMatrix();
    renderer.setSize(s.w, s.h);
  }
  layout();
  window.addEventListener('resize', layout);
  window.addEventListener('scroll', measure, { passive: true });
  measure();

  let live = false;
  new IntersectionObserver(([e]) => { live = e.isIntersecting; }, { threshold: 0 }).observe(root);

  const clock = new THREE.Clock();
  let lastCut = 0;

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!live || document.hidden) return;

    apply(progress);

    // Iskry lecą proporcjonalnie do TEMPA przewijania, nie do czasu.
    // Stoisz — nie sypie. To jest cała teza tej sekcji.
    const cut = at(progress, 2);
    const speed = Math.abs(cut - lastCut);
    lastCut = cut;
    if (progress > STAGE[2] && progress < STAGE[3] && speed > 0.0004) {
      spawn((cut - 0.5) * SHEET_W, Math.min(14, Math.ceil(speed * 900)));
    }
    stepSparks(dt);

    renderer.render(scene, camera);
  }
  frame();
  root.classList.add('is-live');
}

if (root && host && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      boot().catch(() => host.remove());
    },
    { rootMargin: '300px' }
  );
  io.observe(root);
}
