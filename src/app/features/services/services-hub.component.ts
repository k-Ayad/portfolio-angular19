import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services/content.service';
import { SeoService } from '@core/services/seo.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
import { breadcrumbs, servicesCollectionPage } from '@core/seo/structured-data';

@Component({
  selector: 'app-services-hub',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb-trail">
          <li><a [routerLink]="langService.link('/')">{{ ui().home.breadcrumb }}</a></li>
          <li aria-current="page">{{ ui().services.breadcrumb }}</li>
        </ol>
      </nav>

      <h1 class="page-title">{{ ui().services.hubH1 }}</h1>
      <p class="section-lead">{{ ui().services.hubIntro }}</p>

      <div class="pillar-grid">
        <div class="pillar">
          <h2>{{ ui().services.shopifyTitle }}</h2>
          <div class="card-grid single-column">
            @for (service of shopify; track service.slug) {
              <a class="content-card" [routerLink]="langService.link('/services/' + service.slug)">
                <h3>{{ service[langService.lang()].nav }}</h3>
                <p>{{ service[langService.lang()].summary }}</p>
                <span class="card-link">{{ ui().whatIDo.more }}</span>
              </a>
            }
          </div>
        </div>
        <div class="pillar">
          <h2>{{ ui().services.angularTitle }}</h2>
          <div class="card-grid single-column">
            @for (service of angular; track service.slug) {
              <a class="content-card" [routerLink]="langService.link('/services/' + service.slug)">
                <h3>{{ service[langService.lang()].nav }}</h3>
                <p>{{ service[langService.lang()].summary }}</p>
                <span class="card-link">{{ ui().whatIDo.more }}</span>
              </a>
            }
          </div>
        </div>
      </div>

      <section class="content-section">
        <h2>{{ ui().process.title }}</h2>
        <p class="section-lead">{{ ui().process.intro }}</p>
        <ol class="steps">
          @for (step of ui().process.steps; track step.title) {
            <li><strong>{{ step.title }}</strong><span>{{ step.text }}</span></li>
          }
        </ol>
      </section>

      <div class="cta-band">
        <h2>{{ ui().services.ctaTitle }}</h2>
        <p>{{ ui().services.ctaText }}</p>
        <div class="cta-buttons">
          <a class="btn-link primary" [routerLink]="langService.link('/')" fragment="contact">{{ ui().nav.contact }}</a>
          <a class="btn-link" [routerLink]="langService.link('/faq')">{{ ui().services.seeAllFaq }}</a>
        </div>
      </div>
    </div>
  `
})
export class ServicesHubComponent implements OnInit {
  private seoService = inject(SeoService);
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  readonly services = inject(ContentService).getServices();
  readonly shopify = this.services.filter(service => service.pillar === 'shopify');
  readonly angular = this.services.filter(service => service.pillar === 'angular');

  ngOnInit(): void {
    const lang = this.langService.lang();
    const ui = UI[lang];
    const path = this.langService.link('/services');
    this.seoService.setPageMeta({ title: ui.services.hubTitle, description: ui.services.hubDescription, path });
    this.seoService.setStructuredData(
      servicesCollectionPage(
        this.services.map(service => ({ name: service[lang].nav, path: this.langService.link('/services/' + service.slug) })),
        ui.services.hubH1, ui.services.hubDescription, path, lang
      ),
      breadcrumbs([
        { name: ui.home.breadcrumb, path: this.langService.link('/') },
        { name: ui.services.breadcrumb, path }
      ])
    );
  }
}
