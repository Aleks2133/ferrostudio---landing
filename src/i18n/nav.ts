/**
 * Nawigacja landingu (PL). Kolejność: proces zamawiania i realizacja przed
 * kontaktem; wyróżniony przycisk to wycena.
 */
import type { Lang } from './index';

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_BY_LANG: Record<Lang, NavItem[]> = {
  pl: [
    { href: '/#oferta', label: 'Oferta' },
    { href: '/#realizacja', label: 'Realizacja' },
    { href: '/jak-zamawiac', label: 'Jak zamawiać' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
};

/** Jedyny wypełniony przycisk w headerze. */
export const NAV_CTA_BY_LANG: Record<Lang, NavItem> = {
  pl: { href: '/wycena', label: 'Wycena' },
};

export const FOOTER_NAV_BY_LANG: Record<Lang, NavItem[]> = {
  pl: [
    { href: '/jak-zamawiac', label: 'Jak zamawiać' },
    { href: '/wycena', label: 'Wyceń projekt' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
};

/** Dokumenty prawne. */
export const LEGAL_NAV: NavItem[] = [
  { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
  { href: '/regulamin', label: 'Regulamin' },
  { href: '/cookies', label: 'Polityka cookies' },
];
