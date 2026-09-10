// Central site config.

export const SITE = {
  name: 'Ferro Studio',
  legalName: 'Aleksy Weiss',
  url: 'https://ferrostudio.pl',
  email: 'kontakt@ferrostudio.pl',
  phone: '+48 730 009 902',
  phoneHref: 'tel:+48730009902',
  nip: '7312094167',
  regon: '542992223',
  address: {
    street: 'ul. Toruńska 15 lok. 31',
    postal: '95-200',
    city: 'Pabianice',
    country: 'PL',
  },
  region: 'woj. łódzkie',
  areaServed: 'Polska',
  // TODO: linki social
  social: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    facebook: 'https://facebook.com/',
  },
} as const;

// Nawigacja przeniesiona do `src/i18n/nav.ts` — od fazy 4 istnieje w dwóch
// językach i musi być trzymana razem z mapą tras, a nie obok niej.
// Kolejność (portfolio i materiał przed procesem zamawiania, brief 8.3)
// i uzasadnienia są tam w komentarzach.
