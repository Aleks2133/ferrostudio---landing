/**
 * Warstwa językowa — po redukcji do landingu strona jest wyłącznie po polsku.
 * Moduł zostaje jako jedno wejście dla `getLang` / `useTranslations`, których
 * używają Header, Footer i komponenty; przełącznik języka i mapa tras już nie
 * istnieją.
 */

export const LANGS = ['pl'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'pl';

export { ROUTE_PAIRS, EN_TO_PL, normalize, HREFLANG } from './routes.mjs';

/** `og:locale`. */
export const OG_LOCALE: Record<Lang, string> = { pl: 'pl_PL' };

export const LANG_LABEL: Record<Lang, string> = { pl: 'PL' };

export function getLang(_url: URL | string): Lang {
  return 'pl';
}

/** Druga wersja językowa tej samej strony — nie istnieje. */
export function counterpart(_path: string): string | null {
  return null;
}

/** Ścieżka strony głównej. */
export const home = (_lang?: Lang) => '/';

const dict = {
  pl: {
    'nav.aria': 'Główna nawigacja',
    'nav.mobile': 'Nawigacja mobilna',
    'nav.open': 'Otwórz menu',
    'nav.close': 'Zamknij menu',
    'nav.home': 'Ferro Studio — strona główna',
    'nav.lang': 'Wersja językowa',

    'crumbs.aria': 'Okruszki nawigacyjne',
    'crumbs.home': 'Strona główna',

    'skip': 'Przejdź do treści',

    'footer.site': 'Strona',
    'footer.materials': 'Materiały',
    'footer.ordering': 'Zamawianie',
    'footer.contact': 'Kontakt',
    'footer.tagline': 'Logotypy, napisy i dekoracje ścienne z metalu ciętego na wymiar.',
    'footer.shipping': 'Wysyłka na terenie całej Polski.',
    'footer.area': 'Realizacje w całej Polsce',
    'footer.navAria': 'Stopka — nawigacja',
    'footer.matAria': 'Stopka — materiały',
    'footer.ordAria': 'Stopka — zamawianie',
    'footer.legalNote': '',

    'cookie.text': 'Używamy wyłącznie niezbędnych plików cookies.',
    'cookie.link': 'Polityka cookies',
    'cookie.ok': 'Rozumiem',

    'call.aria': 'Zadzwoń',
  },
} as const;

export type UiKey = keyof (typeof dict)['pl'];

/** `const t = useTranslations(lang); t('nav.open')` */
export function useTranslations(_lang?: Lang) {
  return (key: UiKey): string => dict.pl[key];
}
