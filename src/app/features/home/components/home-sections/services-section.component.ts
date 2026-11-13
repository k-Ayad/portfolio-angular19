import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services/content.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="content-section" id="services">
      <div class="container">
        <h2>{{ ui().servicesSection.title }}</h2>
        <p class="section-lead">{{ ui().servicesSection.intro }}</p>
        <div class="card-grid">
          @for (service of services; track service.slug) {
            <a class="content-card" [routerLink]="langService.link('/services/' + service.slug)">
              <h3>{{ service[langService.lang()].nav }}</h3>
              <p>{{ service[langService.lang()].summary }}</p>
              <span class="card-link">{{ ui().servicesSection.more }}</span>
            </a>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesSectionComponent {
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  readonly services = inject(ContentService).getServices();
}
