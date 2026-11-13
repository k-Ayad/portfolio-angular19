import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services/content.service';
import { SeoService } from '@core/services/seo.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
import { breadcrumbs, faqPageStructuredData } from '@core/seo/structured-data';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb-trail">
          <li><a [routerLink]="langService.link('/')">{{ ui().home.breadcrumb }}</a></li>
          <li aria-current="page">{{ ui().faq.breadcrumb }}</li>
        </ol>
      </nav>

      <h1 class="page-title">{{ page().h1 }}</h1>
      <p class="section-lead">{{ page().intro }}</p>

      @for (group of page().groups; track group.title) {
        <section class="faq-group">
          <h2>{{ group.title }}</h2>
          @for (item of group.items; track item.id) {
            <!-- Answers are in the HTML (not loaded on click); each question has its own anchor -->
            <details class="faq-item" [id]="item.id" open>
              <summary><h3>{{ item.q }}</h3></summary>
              <p class="faq-answer">{{ item.a }}</p>
            </details>
          }
        </section>
      }

      <section class="content-section">
        <h2>{{ ui().faq.moreTitle }}</h2>
        <ul class="tag-list">
          @for (service of services; track service.slug) {
            <li><a [routerLink]="langService.link('/services/' + service.slug)">{{ service[langService.lang()].nav }}</a></li>
          }
        </ul>
      </section>

      <div class="cta-band">
        <h2>{{ ui().faq.ctaTitle }}</h2>
        <p>{{ ui().faq.ctaText }}</p>
        <div class="cta-buttons">
          <a class="btn-link primary" [routerLink]="langService.link('/')" fragment="contact">{{ ui().nav.contact }}</a>
        </div>
      </div>
    </div>
  `
})
export class FaqComponent implements OnInit {
  private seoService = inject(SeoService);
  private content = inject(ContentService);
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  readonly page = computed(() => this.content.getFaq(this.langService.lang()));
  readonly services = this.content.getServices();

  ngOnInit(): void {
    const lang = this.langService.lang();
    const ui = UI[lang];
    const page = this.content.getFaq(lang);
    const path = this.langService.link('/faq');

    this.seoService.setPageMeta({ title: page.title, description: page.description, path });
    this.seoService.setStructuredData(
      faqPageStructuredData(this.content.faqItems(lang), path, lang),
      breadcrumbs([
        { name: ui.home.breadcrumb, path: this.langService.link('/') },
        { name: ui.faq.breadcrumb, path }
      ])
    );
  }
}
