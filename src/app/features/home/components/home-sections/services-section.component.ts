import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services/content.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';

// "What I do": two equal columns, Shopify and Angular, with three services each
@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="content-section" id="services">
      <div class="container">
        <h2>{{ ui().whatIDo.title }}</h2>
        <p class="section-lead">{{ ui().whatIDo.intro }}</p>
        <div class="pillar-grid">
          <div class="pillar">
            <h3><i class="fab fa-shopify" aria-hidden="true"></i> {{ ui().whatIDo.shopifyTitle }}</h3>
            <p>{{ ui().whatIDo.shopifyText }}</p>
            <ul class="pillar-list">
              @for (service of shopify; track service.slug) {
                <li><a class="text-link" [routerLink]="langService.link('/services/' + service.slug)">{{ service[langService.lang()].nav }}</a></li>
              }
            </ul>
          </div>
          <div class="pillar">
            <h3><i class="fab fa-angular" aria-hidden="true"></i> {{ ui().whatIDo.angularTitle }}</h3>
            <p>{{ ui().whatIDo.angularText }}</p>
            <ul class="pillar-list">
              @for (service of angular; track service.slug) {
                <li><a class="text-link" [routerLink]="langService.link('/services/' + service.slug)">{{ service[langService.lang()].nav }}</a></li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServicesSectionComponent {
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  private readonly content = inject(ContentService);
  readonly shopify = this.content.getServices().filter(service => service.pillar === 'shopify');
  readonly angular = this.content.getServices().filter(service => service.pillar === 'angular');
}
