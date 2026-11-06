import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { absoluteUrl } from '../seo/structured-data';
import site from '../data/site.json';

export interface PageMeta {
  title: string;
  description: string;
  path: string; // Route path starting with '/', e.g. '/work/arya'
  image?: string; // Absolute URL or path relative to the site root
  imageAlt?: string;
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
    const url = this.siteUrl + (page.path === '/' ? '/' : page.path);
    const image = absoluteUrl(page.image ?? site.image);

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });

    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: page.imageAlt ?? page.title });

    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonicalUrl(url);
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
