import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services/content.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
import site from '@core/data/site.json';

// How I work, skills, FAQ teaser and the hire call to action. Every pillar list has the same number of items.
@Component({
  selector: 'app-home-lower-sections',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="content-section" id="process">
      <div class="container">
        <h2>{{ ui().process.title }}</h2>
        <p class="section-lead">{{ ui().process.intro }}</p>
        <ol class="steps">
          @for (step of ui().process.steps; track step.title) {
            <li><strong>{{ step.title }}</strong><span>{{ step.text }}</span></li>
          }
        </ol>
      </div>
    </section>

    <section class="content-section" id="skills">
      <div class="container">
        <h2>{{ ui().skills.title }}</h2>
        <p class="section-lead">{{ ui().skills.lead }}</p>
        <div class="pillar-grid">
          <div class="pillar">
            <h3>{{ ui().skills.shopifyTitle }}</h3>
            <ul class="tag-list ltr-text">
              @for (skill of ui().skills.shopify; track skill) { <li>{{ skill }}</li> }
            </ul>
          </div>
          <div class="pillar">
            <h3>{{ ui().skills.angularTitle }}</h3>
            <ul class="tag-list ltr-text">
              @for (skill of ui().skills.angular; track skill) { <li>{{ skill }}</li> }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section" id="faq-teaser">
      <div class="container">
        <h2>{{ ui().faqTeaser.title }}</h2>
        <p class="section-lead">{{ ui().faqTeaser.lead }}</p>
        <div class="pillar-grid">
          <div class="pillar">
            <h3>{{ ui().faqTeaser.shopifyTitle }}</h3>
            @for (item of shopifyFaq(); track item.id) {
              <details class="faq-item">
                <summary><h4>{{ item.q }}</h4></summary>
                <p class="faq-answer">{{ item.a }}</p>
              </details>
            }
          </div>
          <div class="pillar">
            <h3>{{ ui().faqTeaser.angularTitle }}</h3>
            @for (item of angularFaq(); track item.id) {
              <details class="faq-item">
                <summary><h4>{{ item.q }}</h4></summary>
                <p class="faq-answer">{{ item.a }}</p>
              </details>
            }
          </div>
        </div>
        <p class="mt-4"><a class="text-link" [routerLink]="langService.link('/faq')">{{ ui().faqTeaser.seeAll }}</a></p>
      </div>
    </section>

    <section class="content-section" id="hire">
      <div class="container">
        <div class="pillar-grid">
          <div class="cta-band">
            <h2>{{ ui().hireCta.shopifyTitle }}</h2>
            <p>{{ ui().hireCta.shopifyText }}</p>
            <div class="cta-buttons">
              <a class="btn-link primary" [href]="mailto(ui().hireCta.shopifySubject)">{{ ui().hireCta.shopifyEmail }}</a>
            </div>
          </div>
          <div class="cta-band">
            <h2>{{ ui().hireCta.angularTitle }}</h2>
            <p>{{ ui().hireCta.angularText }}</p>
            <div class="cta-buttons">
              <a class="btn-link primary" [href]="mailto(ui().hireCta.angularSubject)">{{ ui().hireCta.angularEmail }}</a>
            </div>
          </div>
        </div>
        <p class="cta-more">
          <a class="text-link" [href]="linkedin" target="_blank" rel="noopener noreferrer">{{ ui().hireCta.linkedin }}</a>
          <a class="text-link" href="assets/resume/Senior-Frontend-Engineer.pdf" download="Kerllos-Ayad-Senior-Frontend-Engineer.pdf">{{ ui().hireCta.resume }}</a>
        </p>
      </div>
    </section>
  `
})
export class HomeLowerSectionsComponent {
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  private readonly content = inject(ContentService);

  private pick(ids: string[]) {
    return ids
      .map(id => this.content.faqItem(id, this.langService.lang()))
      .filter((item): item is NonNullable<typeof item> => !!item);
  }

  // Two questions per pillar
  readonly shopifyFaq = computed(() => this.pick(['what-is-shopify-liquid', 'speed-up-shopify-store']));
  readonly angularFaq = computed(() => this.pick(['angular-web-apps', 'angular-seo-prerendering']));
  readonly linkedin = site.linkedin;

  mailto(subject: string): string {
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
  }
}
