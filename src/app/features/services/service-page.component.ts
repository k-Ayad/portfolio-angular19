import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService, ServiceEntry } from '@core/services/content.service';
import { ProjectsService } from '@core/services/projects.service';
import { SeoService } from '@core/services/seo.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
import { breadcrumbs, serviceStructuredData } from '@core/seo/structured-data';
import { Project } from '@core/models/project.interface';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (service()) {
      <article class="page-container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb-trail">
            <li><a [routerLink]="langService.link('/')">{{ ui().home.breadcrumb }}</a></li>
            <li><a [routerLink]="langService.link('/services')">{{ ui().services.breadcrumb }}</a></li>
            <li aria-current="page">{{ text().nav }}</li>
          </ol>
        </nav>

        <h1 class="page-title">{{ text().h1 }}</h1>
        <p class="section-lead">{{ text().summary }}</p>

        <section class="content-section">
          <h2>{{ ui().services.whatYouGet }}</h2>
          <p class="section-lead">{{ text().whatYouGet }}</p>
        </section>

        <section class="content-section">
          <h2>{{ text().includedTitle }}</h2>
          <ul class="check-list">
            @for (item of text().included; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </section>

        <section class="content-section">
          <h2>{{ ui().process.title }}</h2>
          <p class="section-lead">{{ ui().process.intro }}</p>
          <ol class="steps">
            @for (step of ui().process.steps; track step.title) {
              <li><strong>{{ step.title }}</strong><span>{{ step.text }}</span></li>
            }
          </ol>
        </section>

        <section class="content-section">
          <h2>{{ ui().services.related }}</h2>
          <div class="card-grid">
            @for (project of related; track project.slug) {
              <a class="content-card" [routerLink]="langService.link('/work/' + project.slug)">
                <h3>{{ project.title }}</h3>
                <p>{{ projectSummary(project) }}</p>
              </a>
            }
          </div>
        </section>

        <section class="content-section">
          <h2>{{ text().pricingTitle }}</h2>
          <p class="section-lead">{{ text().pricing }}</p>
        </section>

        <section class="content-section">
          <h2>{{ ui().services.faqTitle }}</h2>
          @for (item of faqItems(); track item.id) {
            <details class="faq-item">
              <summary><h3>{{ item.q }}</h3></summary>
              <p class="faq-answer">{{ item.a }}</p>
            </details>
          }
          <p class="mt-4"><a class="text-link" [routerLink]="langService.link('/faq')">{{ ui().services.seeAllFaq }}</a></p>
        </section>

        <div class="cta-band">
          <h2>{{ ui().services.ctaTitle }}</h2>
          <p>{{ ui().services.ctaText }}</p>
          <div class="cta-buttons">
            <a class="btn-link primary" [routerLink]="langService.link('/')" fragment="contact">{{ ui().nav.contact }}</a>
            <a class="btn-link" [routerLink]="langService.link('/services')">{{ ui().services.breadcrumb }}</a>
          </div>
        </div>
      </article>
    }
  `
})
export class ServicePageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private content = inject(ContentService);
  private projectsService = inject(ProjectsService);
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);

  readonly service = signal<ServiceEntry | undefined>(undefined);
  related: Project[] = [];
  private sub?: Subscription;

  readonly text = computed(() => this.content.text(this.service()!, this.langService.lang()));
  readonly faqItems = computed(() =>
    (this.service()?.faqIds ?? [])
      .map(id => this.content.faqItem(id, this.langService.lang()))
      .filter((item): item is NonNullable<typeof item> => !!item)
  );

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const service = this.content.getService(params['slug']);
      this.service.set(service);
      if (!service) return;
      this.related = service.projects
        .map(slug => this.projectsService.getBySlug(slug))
        .filter((project): project is Project => !!project);
      this.updateSeo(service);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  projectSummary(project: Project): string {
    return this.projectsService.text(project, this.langService.lang()).summary;
  }

  private updateSeo(service: ServiceEntry): void {
    const lang = this.langService.lang();
    const ui = UI[lang];
    const text = service[lang];
    const path = this.langService.link('/services/' + service.slug);

    this.seoService.setPageMeta({ title: text.title, description: text.description, path });
    this.seoService.setStructuredData(
      serviceStructuredData(text.h1, service.en.nav, text.description, path, lang),
      breadcrumbs([
        { name: ui.home.breadcrumb, path: this.langService.link('/') },
        { name: ui.services.breadcrumb, path: this.langService.link('/services') },
        { name: text.nav, path }
      ])
    );
  }
}
