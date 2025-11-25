import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(tags: {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
  }) {
    if (tags.title) {
      this.title.setTitle(tags.title);
      this.meta.updateTag({ property: 'og:title', content: tags.title });
    }

    if (tags.description) {
      this.meta.updateTag({ name: 'description', content: tags.description });
      this.meta.updateTag({ property: 'og:description', content: tags.description });
    }

    if (tags.keywords) {
      this.meta.updateTag({ name: 'keywords', content: tags.keywords });
    }

    if (tags.author) {
      this.meta.updateTag({ name: 'author', content: tags.author });
    }

    if (tags.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: tags.ogImage });
    }

    if (tags.ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: tags.ogUrl });
    }
  }
}
