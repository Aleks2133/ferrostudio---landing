/**
 * Teaser konfiguratora na stronie głównej (brief, sekcja 06).
 *
 * Świadomie NIE jest to konfigurator w miniaturze. Pokazuje jedną rzecz —
 * ten sam znak w dwóch metalach, na ścianie, z cieniem od dystansów — i tyle.
 * Cała reszta jest o jedno kliknięcie dalej, na własnej podstronie, gdzie
 * użytkownik przychodzi świadomie i gdzie wolno kosztować.
 *
 * Wydajność (brief 16): scena nie istnieje, dopóki sekcja nie wejdzie
 * w widok, i zatrzymuje się, gdy z niego wyjdzie. `three` przyjeżdża z tej
 * samej import mapy co hero, więc na stronie głównej pobiera się raz.
 */
const host = document.getElementById('teaser-scene');
const section = document.getElementById('teaser');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const LOOK = {
  corten: { color: 0x8b4a2b, metalness: 0.32, roughness: 0.8 },
  nierdzewna: { color: 0x9ba1a6, metalness: 0.95, roughness: 0.3 },
};

async function boot() {
  const THREE = await import('three');
  const { analyze } = await import('/js/ferro-mask.mjs');
  const CDN = '/vendor/three/jsm';
  const [{ RoomEnvironment }, { RectAreaLightUniformsLib }] = await Promise.all([
    import(`${CDN}/environments/RoomEnvironment.js`),
    import(`${CDN}/lights/RectAreaLightUniformsLib.js`),
  ]);

  const size = () => ({ w: host.clientWidth, h: host.clientHeight });
  let { w, h } = size();
  if (!w || !h) return;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, w / h, 0.05, 40);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({ color: 0xd8d3ca, roughness: 0.95 })
  );
  scene.add(wall);

  // Ta sama zasada co w konfiguratorze: cień łapie osobna płaszczyzna
  // z `ShadowMaterial`, bo duże źródła powierzchniowe potrzebne metalowi
  // rozjaśniają ścianę dokładnie tam, gdzie cień ma leżeć.
  const catcher = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.ShadowMaterial({ opacity: 0.5 })
  );
  catcher.position.z = 0.002;
  catcher.receiveShadow = true;
  scene.add(catcher);

  RectAreaLightUniformsLib.init();

  scene.add(new THREE.AmbientLight(0xf0e8dc, 0.3));

  const key = new THREE.DirectionalLight(0xfff3e4, 2.8);
  key.position.set(-1.6, 1.5, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.normalBias = 0.004;
  key.shadow.radius = 3;
  key.shadow.camera.left = -1.2;
  key.shadow.camera.right = 1.2;
  key.shadow.camera.top = 1.2;
  key.shadow.camera.bottom = -1.2;
  key.shadow.camera.updateProjectionMatrix();
  scene.add(key);

  // Blisko osi patrzenia: płaska blacha odbija to, co stoi za kamerą,
  // więc źródło z boku po prostu nie trafiłoby w kadr.
  const soft = new THREE.RectAreaLight(0xe6ecff, 2.3, 3.4, 2.2);
  soft.position.set(-0.5, 0.8, 1.9);
  soft.lookAt(0, 0, 0);
  scene.add(soft);

  const warm = new THREE.RectAreaLight(0xffd8b0, 1.6, 2.6, 1.6);
  warm.position.set(1.5, -0.9, 1.5);
  warm.lookAt(0, 0, 0);
  scene.add(warm);

  const material = new THREE.MeshStandardMaterial({ ...LOOK.corten, envMapIntensity: 1.9 });

  const res = await analyze(await fetch('/logo2.png').then((r) => r.blob()), 384);
  if (!res?.polygons.length) return;

  const shapes = res.polygons.map(({ outer, holes }) => {
    const s = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2(x, y)));
    for (const hole of holes) s.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))));
    return s;
  });

  const geo = new THREE.ExtrudeGeometry(shapes, { depth: 1, bevelEnabled: false, curveSegments: 1 });
  geo.center();

  const WIDTH = 0.9; // metry
  const mesh = new THREE.Mesh(geo, material);
  mesh.scale.set(WIDTH, WIDTH, 0.003);
  mesh.position.z = 0.025 + 0.0015; // dystanse 25 mm — najczęstszy montaż
  mesh.castShadow = true;
  scene.add(mesh);

  function layout() {
    const s = size();
    if (!s.w || !s.h) return;
    camera.aspect = s.w / s.h;
    camera.updateProjectionMatrix();
    renderer.setSize(s.w, s.h);
    const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
    camera.position.set(0.22, 0.08, Math.max(0.9, WIDTH / 0.62 / (2 * Math.tan(halfFov) * Math.max(0.5, camera.aspect))));
    camera.lookAt(0, 0, 0.012);
  }
  layout();
  window.addEventListener('resize', layout);

  // Przełącznik materiału — jedyna interakcja w tej sekcji.
  document.querySelectorAll('[data-teaser-mat]').forEach((b) => {
    b.addEventListener('click', () => {
      const look = LOOK[b.dataset.teaserMat];
      if (!look) return;
      material.color.set(look.color);
      material.metalness = look.metalness;
      material.roughness = look.roughness;
      material.needsUpdate = true;
      document.querySelectorAll('[data-teaser-mat]').forEach((x) => {
        const on = x === b;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  });

  let live = true;
  new IntersectionObserver(([e]) => { live = e.isIntersecting; }, { threshold: 0 }).observe(section);

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!live || document.hidden) return;
    if (!reduceMotion) {
      // Bardzo powolny przejazd światła — pokazuje, że to żywa scena,
      // a nie zdjęcie, i nie robi nic poza tym.
      const t = clock.getElapsedTime();
      key.position.x = -1.6 + Math.sin(t * 0.22) * 0.7;
      key.position.y = 1.5 + Math.cos(t * 0.17) * 0.3;
    }
    renderer.render(scene, camera);
  }
  frame();
  section.classList.add('is-live');
}

if (host && section) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      boot().catch(() => host.remove());
    },
    { rootMargin: '200px' }
  );
  io.observe(section);
}
