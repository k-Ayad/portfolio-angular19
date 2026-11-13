import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { absoluteUrl } from '../seo/structured-data';
import { ARABIC_LIVE, Lang, langFromUrl, localize, stripLang } from '../i18n/lang';
import site from '../data/site.json';

export interface PageMeta {
  title: string;
  description: string;
  path: string; // Route path starting with '/', e.g. '/work/arya'
  image?: string; // Absolute URL or path relative to the site root
  imageAlt?: string;
  alternates?: boolean; // false for pages with no twin in the other language
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteUrl = site.url;

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  /**
   * Update title, description, canonical URL, Open Graph and Twitter tags for a page
   */
  setPageMeta(page: PageMeta) {
    const lang = langFromUrl(page.path);
    const url = this.siteUrl + page.path;
    const image = absoluteUrl(page.image ?? site.image);

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: page.imageAlt ?? page.title });

    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonicalUrl(url);
    this.setLanguage(lang);
    this.setAlternates(page.alternates === false ? undefined : page.path, lang);
  }

  /**
   * Page that must stay out of search results (e.g. the 404 page): noindex and no canonical URL
   */
  setNotFoundMeta(title: string, description: string, lang: Lang = 'en') {
    this.title.setTitle(title);
    this.setLanguage(lang);
    this.setAlternates(undefined, lang);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
    this.document.head.querySelector('link[rel="canonical"]')?.remove();
  }

  /**
   * Replace the JSON-LD blocks of the current page. Passing nothing clears them,
   * so blocks from a previous route never leak onto the next one.
   */
  setStructuredData(...blocks: Record<string, unknown>[]) {
    this.document.head
      .querySelectorAll('script[data-seo-jsonld]')
      .forEach(node => node.remove());

    for (const block of blocks) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '');
      // "<" is escaped so page text can never close the script tag early
      script.textContent = JSON.stringify(block).replace(/</g, '\\u003c');
      this.document.head.appendChild(script);
    }
  }

  /**
   * `lang` and `dir` on <html>, and the Open Graph locale
   */
  private setLanguage(lang: Lang) {
    const root = this.document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    this.meta.updateTag({ property: 'og:locale', content: lang === 'ar' ? 'ar_AR' : 'en_US' });

    // The Arabic font is preloaded on Arabic pages so text doesn't shift when it arrives
    this.document.head.querySelectorAll('link[data-arabic-font]').forEach(node => node.remove());
    if (lang === 'ar') {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'font');
      link.setAttribute('type', 'font/woff2');
      link.setAttribute('crossorigin', '');
      link.setAttribute('href', '/assets/fonts/cairo-arabic-wght.woff2');
      link.setAttribute('data-arabic-font', '');
      this.document.head.appendChild(link);
    }
  }

  /**
   * Reciprocal hreflang links (en, ar, x-default) for a page and its twin. Only exists while Arabic is live.
   */
  private setAlternates(path: string | undefined, lang: Lang) {
    this.document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(node => node.remove());
    this.meta.removeTag('property="og:locale:alternate"');
    if (!ARABIC_LIVE || !path) return;

    const englishPath = stripLang(path);
    const links: [string, string][] = [
      ['en', this.siteUrl + localize(englishPath, 'en')],
      ['ar', this.siteUrl + localize(englishPath, 'ar')],
      ['x-default', this.siteUrl + localize(englishPath, 'en')]
    ];
    for (const [hreflang, href] of links) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      this.document.head.appendChild(link);
    }
    this.meta.addTag({ property: 'og:locale:alternate', content: lang === 'ar' ? 'en_US' : 'ar_AR' });
  }

  private setCanonicalUrl(url: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
