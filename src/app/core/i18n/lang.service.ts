import { Injectable, inject, signal } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Lang, langFromUrl, localize, otherLang, stripLang } from './lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  private router = inject(Router);

  /** Language of the page being shown; updated as soon as the router recognizes the URL, before components are created */
  readonly lang = signal<Lang>(langFromUrl(this.router.url));

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.lang.set(langFromUrl(event.urlAfterRedirects));
      }
    });
  }

  get dir(): 'ltr' | 'rtl' {
    return this.lang() === 'ar' ? 'rtl' : 'ltr';
  }

  /** Link to an English route in the current language */
  link(path: string): string {
    return localize(path, this.lang());
  }

  /** Same page in the other language (for the switcher) */
  switchLink(currentUrl: string): string {
    const path = stripLang(currentUrl.split(/[?#]/)[0]);
    return localize(path, otherLang(this.lang()));
  }
}
