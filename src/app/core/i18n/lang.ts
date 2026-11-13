import site from '../data/site.json';

export type Lang = 'en' | 'ar';

// Arabic routes, hreflang and the language switcher only exist while this is true (set after the native review)
export const ARABIC_LIVE: boolean = site.arabicLive;

export const LANGS: Lang[] = ARABIC_LIVE ? ['en', 'ar'] : ['en'];

export const isArabicPath = (path: string): boolean => /^\/ar(\/|$|[?#])/.test(path);

export const langFromUrl = (url: string): Lang => (ARABIC_LIVE && isArabicPath(url) ? 'ar' : 'en');

/** Path of an English route in the given language: localize('/services', 'ar') -> '/ar/services' */
export function localize(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/ar/' : `/ar${clean}`;
}

/** The English route behind a path in either language */
export function stripLang(path: string): string {
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ar' : 'en');
