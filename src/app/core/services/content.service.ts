import { Injectable } from '@angular/core';
import servicesData from '../data/services.json';
import faqData from '../data/faq.json';
import { Lang } from '../i18n/lang';

export interface ServiceText {
  nav: string; title: string; description: string; h1: string; summary: string; whatYouGet: string;
  includedTitle: string; included: string[]; pricingTitle: string; pricing: string;
}
export interface ServiceEntry { slug: string; pillar: 'shopify' | 'angular'; projects: string[]; faqIds: string[]; en: ServiceText; ar: ServiceText }
export interface FaqItem { id: string; q: string; a: string }
export interface FaqPage {
  title: string; description: string; h1: string; intro: string;
  groups: { title: string; items: FaqItem[] }[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly services = servicesData.services as ServiceEntry[];
  private readonly faq = { en: faqData.en, ar: faqData.ar } as Record<Lang, FaqPage>;

  getServices(): ServiceEntry[] {
    return this.services;
  }

  getService(slug: string): ServiceEntry | undefined {
    return this.services.find(service => service.slug === slug);
  }

  text(service: ServiceEntry, lang: Lang): ServiceText {
    return service[lang];
  }

  getFaq(lang: Lang): FaqPage {
    return this.faq[lang];
  }

  faqItems(lang: Lang): FaqItem[] {
    return this.faq[lang].groups.flatMap(group => group.items);
  }

  faqItem(id: string, lang: Lang): FaqItem | undefined {
    return this.faqItems(lang).find(item => item.id === id);
  }
}
