/**
 * Strona jest jednojęzyczna (PL). Mapa tras została pusta po redukcji do
 * landingu — zostają tylko funkcje, których używa `astro.config.mjs`
 * (sitemap) i `src/i18n/index.ts`.
 */

/** @type {Record<string, string>} */
export const ROUTE_PAIRS = {};

/** @type {Record<string, string>} */
export const EN_TO_PL = {};

/** Ścieżka bez końcowego slasha — `trailingSlash: 'never'` w astro.config. */
export const normalize = (path) => path.replace(/\/+$/, '') || '/';

/** `hreflang` w postaci, jakiej oczekują wyszukiwarki. */
export const HREFLANG = { pl: 'pl-PL' };
