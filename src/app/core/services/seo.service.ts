import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface PageMeta {
  title: string;
  description: string;
  path: string; // Route path starting with '/', e.g. '/project/16'
  image?: string; // Absolute URL or path relative to the site root
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteUrl = 'https://k-ayad.com';
  private readonly defaultImage = 'assets/images/profile.webp';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  /**
   * Update title, description, canonical URL, Open Graph and Twitter tags for a page
   */
  setPageMeta(page: PageMeta) {
    const url = this.siteUrl + page.path;
    const image = this.toAbsoluteUrl(page.image ?? this.defaultImage);

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });

    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: page.title });

    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonicalUrl(url);
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

  private toAbsoluteUrl(path: string): string {
    return /^https?:\/\//.test(path) ? path : `${this.siteUrl}/${path.replace(/^\//, '')}`;
  }
}
