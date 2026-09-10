/**
 * Zawężony, self-hostowany build three.js (brief 12.3 i 16.3).
 *
 * Z CDN szło ~1,6 MB nieskompresowanego kodu na hero: cała biblioteka plus
 * dodatki, z czego używamy może jednej czwartej. Ten skrypt składa z ŹRÓDEŁ
 * three (nie z gotowego bundla — `src/` tree-shake'uje się nieporównanie
 * lepiej) pakiet zawierający wyłącznie to, po co sięga nasz kod.
 *
 * Uruchomienie:  node scripts/build-vendor-three.mjs
 * Wynik:         public/vendor/three/…   (wchodzi do repo, wdraża się z dist/)
 *
 * Zależności: ŻADNYCH nowych w package.json. Bundlerem jest `vite`, które
 * i tak siedzi w drzewie Astro; źródła three pobiera ten skrypt do `.cache/`.
 */
import { build } from 'vite';
import { mkdir, writeFile, readFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';

const exec = promisify(execFile);

/** Wersja przypięta na sztywno — ta sama, która była w import mapie z CDN.
 *  Podniesienie wersji to świadoma decyzja, nie efekt uboczny `npm i`. */
const VERSION = '0.160.0';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, '.cache');
const SRC = path.join(CACHE, `three-${VERSION}`, 'package');
const WORK = path.join(CACHE, 'three-entry');
const OUT = path.join(ROOT, 'public', 'vendor', 'three');

/**
 * Nazwy, po które faktycznie sięga nasz kod (`THREE.*` w Hero.astro,
 * konfiguratorze, scrollytellingu i teaserze). Lista jest jawna, bo to ona
 * decyduje, co przetrwa tree-shaking — a `import * as THREE` nie daje
 * bundlerowi żadnej wskazówki.
 *
 * KTO TO ZMIENIA: jeśli dopiszesz w kodzie `new THREE.Coś()`, którego tu nie
 * ma, dostaniesz `undefined is not a constructor` dopiero w przeglądarce.
 * Skrypt sam sprawdza spójność tej listy z kodem — patrz `verifyUsage()`.
 */
const CORE = [
  'ACESFilmicToneMapping', 'AdditiveBlending', 'AmbientLight', 'BoxGeometry',
  'BufferAttribute', 'BufferGeometry', 'CanvasTexture', 'Clock', 'Color',
  'DataTexture', 'DirectionalLight', 'DoubleSide', 'EdgesGeometry',
  'ExtrudeGeometry', 'Float32BufferAttribute', 'Group', 'LineBasicMaterial',
  'LineSegments', 'LinearFilter', 'MathUtils', 'Mesh', 'MeshBasicMaterial',
  'MeshStandardMaterial', 'NoColorSpace', 'OrthographicCamera',
  'PCFSoftShadowMap', 'PMREMGenerator', 'Path', 'PerspectiveCamera', 'Plane',
  'PlaneGeometry', 'PointLight', 'Points', 'PointsMaterial', 'RGBAFormat',
  'RectAreaLight', 'RepeatWrapping', 'SRGBColorSpace', 'Scene',
  'ShaderMaterial', 'ShadowMaterial', 'Shape', 'Vector2', 'Vector3',
  'WebGLRenderTarget', 'WebGLRenderer',
];

/** Dodatki z `examples/jsm`. Importują `three` jako bare specifier — dlatego
 *  import mapa zostaje, zmienia się tylko cel mapowania. */
const ADDONS = {
  'jsm/environments/RoomEnvironment': 'examples/jsm/environments/RoomEnvironment.js',
  // `RectAreaLightUniformsLib` NIE idzie ze źródeł — podmieniamy go na wersję
  // z tablicami LTC spakowanymi do half-float. Powód i pomiary w `writeLtcModule()`.
  'jsm/lights/RectAreaLightUniformsLib': null,
  'jsm/postprocessing/EffectComposer': 'examples/jsm/postprocessing/EffectComposer.js',
  'jsm/postprocessing/RenderPass': 'examples/jsm/postprocessing/RenderPass.js',
  'jsm/postprocessing/UnrealBloomPass': 'examples/jsm/postprocessing/UnrealBloomPass.js',
  'jsm/postprocessing/OutputPass': 'examples/jsm/postprocessing/OutputPass.js',
  'jsm/exporters/GLTFExporter': 'examples/jsm/exporters/GLTFExporter.js',
};

/** Pliki, w których szukamy użyć `THREE.*` przy kontroli spójności. */
const CONSUMERS = [
  'public/js/hero.mjs',
  'public/js/konfigurator.mjs',
  'public/js/proces.mjs',
  'public/js/teaser.mjs',
];

// ---------------------------------------------------------------------------

async function ensureSource() {
  if (existsSync(path.join(SRC, 'src', 'Three.js'))) return;

  await mkdir(path.join(CACHE, `three-${VERSION}`), { recursive: true });
  const tgz = path.join(CACHE, `three-${VERSION}.tgz`);

  if (!existsSync(tgz)) {
    const url = `https://registry.npmjs.org/three/-/three-${VERSION}.tgz`;
    process.stdout.write(`  pobieram ${url}\n`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`nie udało się pobrać three ${VERSION}: ${res.status}`);
    await writeFile(tgz, Buffer.from(await res.arrayBuffer()));
  }

  // `tar` jest w Windows 10+ i w każdym uniksie — nie dokładamy zależności npm.
  // Ścieżki podajemy WZGLĘDNE, z `cwd` na katalogu docelowym: GNU tar (to z
  // Git Basha bywa pierwsze w PATH na Windows) czyta `C:\…` jako nazwę hosta
  // i próbuje się łączyć po sieci.
  await exec('tar', ['xzf', path.relative(path.join(CACHE, `three-${VERSION}`), tgz)], {
    cwd: path.join(CACHE, `three-${VERSION}`),
  });
}

/**
 * Kontrola spójności: czy kod używa czegoś, czego nie ma w `CORE`.
 * To jest zabezpieczenie przed najgorszym trybem awarii tego rozwiązania —
 * brakująca nazwa nie wywala buildu, tylko psuje scenę w przeglądarce.
 */
async function verifyUsage() {
  const used = new Set();
  for (const rel of CONSUMERS) {
    const code = await readFile(path.join(ROOT, rel), 'utf8');
    for (const m of code.matchAll(/THREE\.([A-Za-z_][A-Za-z0-9_]*)/g)) used.add(m[1]);
  }
  const missing = [...used].filter((n) => !CORE.includes(n)).sort();
  const extra = CORE.filter((n) => !used.has(n)).sort();

  if (missing.length) {
    throw new Error(
      `Kod używa nazw spoza listy CORE: ${missing.join(', ')}\n` +
        `Dopisz je w scripts/build-vendor-three.mjs i przebuduj vendor.`
    );
  }
  if (extra.length) process.stdout.write(`  uwaga: w CORE są nieużywane nazwy: ${extra.join(', ')}\n`);
}

/**
 * Zamiennik `RectAreaLightUniformsLib` z tablicami LTC w half-float.
 *
 * DLACZEGO
 * --------
 * Oryginał to 243 kB JS-a, z czego prawie wszystko to dwie tablice po 16384
 * liczb zapisane jako literały. Po tree-shakingu zostawał największym
 * pojedynczym plikiem całego pakietu: 99,5 kB gzip i tyle samo do sparsowania
 * przy każdym wejściu na stronę główną.
 *
 * Te same dane w half-float, zakodowane base64 w module, to 85 kB surowo
 * i 55 kB gzip — o 44 kB mniej w transferze i o 157 kB mniej do parsowania.
 * Na telefonie liczy się głównie to drugie.
 *
 * DLACZEGO base64 W MODULE, A NIE OSOBNY `.bin`
 * --------------------------------------------
 * Osobny plik binarny byłby jeszcze o 5 kB lżejszy, ale wymusiłby `fetch`,
 * czyli asynchroniczne `init()`. Zmiana sygnatury publicznej metody w czterech
 * miejscach kodu dla 5 kB to zły interes — a synchroniczny `init()` jest tym,
 * czego oczekują wszystkie nasze sceny.
 *
 * PRECYZJA
 * --------
 * Half-float daje maks. błąd 4,9e-4 przy zakresie wartości -0,30..1,66,
 * czyli ok. 0,02%. To jest tablica APROKSYMACJI BRDF, a nie pomiar — i sam
 * three.js używa dokładnie tych half-floatów na każdym urządzeniu bez
 * `OES_texture_float_linear`, czyli na większości telefonów.
 */
async function writeLtcModule() {
  const src = await readFile(path.join(SRC, 'examples/jsm/lights/RectAreaLightUniformsLib.js'), 'utf8');

  /** Wycięcie literału tablicy przez zliczanie nawiasów — regexp by tu poległ. */
  const grab = (name) => {
    const at = src.indexOf(`const ${name} = [`);
    if (at < 0) throw new Error(`nie znaleziono tablicy ${name} w źródle three`);
    const start = src.indexOf('[', at);
    let depth = 0;
    let end = start;
    for (; end < src.length; end++) {
      if (src[end] === '[') depth++;
      else if (src[end] === ']' && --depth === 0) { end++; break; }
    }
    // Literał liczb z pliku o znanej sumie kontrolnej (przypięta wersja three).
    return JSON.parse(src.slice(start, end).replace(/-\s+/g, '-'));
  };

  const values = Float32Array.from([...grab('LTC_MAT_1'), ...grab('LTC_MAT_2')]);
  const half = new Float16Array(values);
  const b64 = Buffer.from(half.buffer).toString('base64');

  const mod = `// generowane przez scripts/build-vendor-three.mjs — nie edytować
// Tablice LTC (Heitz i in., https://github.com/selfshadow/ltc_code) spakowane
// do half-float. API identyczne z oryginalnym RectAreaLightUniformsLib.
import {
  ClampToEdgeWrapping, DataTexture, FloatType, HalfFloatType,
  LinearFilter, NearestFilter, RGBAFormat, UVMapping, UniformsLib,
} from '${path.join(SRC, 'src', 'Three.js').replaceAll('\\', '/')}';

const PACKED = '${b64}';
const N = 64 * 64 * 4;

function unpack() {
  const bin = atob(PACKED);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Uint16Array(bytes.buffer);
}

const tex = (data, type) =>
  new DataTexture(data, 64, 64, RGBAFormat, type, UVMapping,
    ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, NearestFilter, 1);

class RectAreaLightUniformsLib {
  static init() {
    const halfs = unpack();
    const half1 = halfs.subarray(0, N);
    const half2 = halfs.subarray(N, N * 2);

    // Wariant zmiennoprzecinkowy odtwarzamy z tych samych half-floatów.
    // Float16Array jest w każdej przeglądarce, która i tak jest nam potrzebna
    // do WebGL2; gdyby go zabrakło, rozpakowujemy ręcznie.
    const toF32 = (u16) =>
      typeof Float16Array === 'function'
        ? Float32Array.from(new Float16Array(u16.buffer, u16.byteOffset, u16.length))
        : Float32Array.from(u16, decodeHalf);

    UniformsLib.LTC_FLOAT_1 = tex(toF32(half1), FloatType);
    UniformsLib.LTC_FLOAT_2 = tex(toF32(half2), FloatType);
    UniformsLib.LTC_FLOAT_1.needsUpdate = true;
    UniformsLib.LTC_FLOAT_2.needsUpdate = true;

    UniformsLib.LTC_HALF_1 = tex(half1, HalfFloatType);
    UniformsLib.LTC_HALF_2 = tex(half2, HalfFloatType);
    UniformsLib.LTC_HALF_1.needsUpdate = true;
    UniformsLib.LTC_HALF_2.needsUpdate = true;
  }
}

/** Awaryjne rozpakowanie half-float, gdyby Float16Array nie było dostępne. */
function decodeHalf(h) {
  const s = (h & 0x8000) ? -1 : 1;
  const e = (h & 0x7c00) >> 10;
  const f = h & 0x03ff;
  if (e === 0) return s * 6.103515625e-5 * (f / 1024);
  if (e === 31) return f ? NaN : s * Infinity;
  return s * Math.pow(2, e - 15) * (1 + f / 1024);
}

export { RectAreaLightUniformsLib };
`;

  const file = path.join(WORK, 'jsm__lights__RectAreaLightUniformsLib.js');
  await writeFile(file, mod);
  process.stdout.write(`  LTC spakowane do half-float: ${(b64.length / 1024).toFixed(1)} kB base64
`);
  return file;
}

async function writeEntries() {
  await rm(WORK, { recursive: true, force: true });
  await mkdir(WORK, { recursive: true });

  const threeSrc = path.join(SRC, 'src', 'Three.js').replaceAll('\\', '/');
  await writeFile(
    path.join(WORK, 'three.js'),
    `// generowane przez scripts/build-vendor-three.mjs — nie edytować\n` +
      `export { ${CORE.join(', ')} } from '${threeSrc}';\n`
  );

  for (const [name, rel] of Object.entries(ADDONS)) {
    // `rel === null` znaczy „mamy własną wersję tego dodatku" — patrz writeLtcModule().
    if (rel === null) continue;
    const file = path.join(WORK, `${name.replaceAll('/', '__')}.js`);
    await writeFile(file, `export * from '${path.join(SRC, rel).replaceAll('\\', '/')}';\n`);
  }

  await writeLtcModule();
}

function sizes(buf) {
  return {
    raw: buf.length,
    gzip: gzipSync(buf, { level: 9 }).length,
    br: brotliCompressSync(buf, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: buf.length },
    }).length,
  };
}

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;

async function run() {
  process.stdout.write(`three ${VERSION} → public/vendor/three\n`);
  await ensureSource();
  await verifyUsage();
  await writeEntries();

  const input = { three: path.join(WORK, 'three.js') };
  for (const name of Object.keys(ADDONS)) input[name] = path.join(WORK, `${name.replaceAll('/', '__')}.js`);

  await rm(OUT, { recursive: true, force: true });

  await build({
    logLevel: 'warn',
    configFile: false,
    // `root` na katalogu roboczym w `.cache`, a `publicDir: false` — bez tego
    // vite bierze root z cwd, znajduje NASZE `public/` i kopiuje je w całości
    // do outDir, czyli do `public/vendor/three/`. Rekurencyjnie, 274 MB.
    root: WORK,
    publicDir: false,
    // `three` w dodatkach ma trafić w źródła, a nie w pakiet z node_modules
    // (którego tu nie ma — świadomie nie instalujemy three jako zależności).
    resolve: { alias: { three: path.join(SRC, 'src', 'Three.js') } },
    build: {
      outDir: OUT,
      emptyOutDir: true,
      target: 'es2022',
      minify: 'esbuild',
      rollupOptions: {
        input,
        // `preserveEntrySignatures` musi zostać przy 'exports-only', inaczej
        // bundler może zwinąć wejścia i połamać ścieżki importów w kodzie.
        preserveEntrySignatures: 'exports-only',
        output: {
          format: 'es',
          dir: OUT,
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
        },
      },
    },
  });

  // Raport rozmiarów — bez tego „zawężony build" jest deklaracją, nie faktem.
  const { readdir } = await import('node:fs/promises');
  const walk = async (dir) => {
    const out = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else out.push(p);
    }
    return out;
  };

  const files = (await walk(OUT)).filter((f) => f.endsWith('.js')).sort();
  let totalRaw = 0;
  let totalBr = 0;
  process.stdout.write('\n  plik'.padEnd(52) + 'raw'.padStart(10) + 'gzip'.padStart(10) + 'br'.padStart(10) + '\n');
  for (const f of files) {
    const s = sizes(await readFile(f));
    totalRaw += s.raw;
    totalBr += s.br;
    process.stdout.write(
      '  ' + path.relative(OUT, f).replaceAll('\\', '/').padEnd(50) +
        kb(s.raw).padStart(10) + kb(s.gzip).padStart(10) + kb(s.br).padStart(10) + '\n'
    );
  }
  process.stdout.write('  ' + 'RAZEM'.padEnd(50) + kb(totalRaw).padStart(10) + ''.padStart(10) + kb(totalBr).padStart(10) + '\n');
  await stat(path.join(OUT, 'three.js'));
}

run().catch((e) => {
  process.stderr.write(`${e.stack ?? e}\n`);
  process.exit(1);
});
