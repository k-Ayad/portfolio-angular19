import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services/content.service';
import { ProjectsService } from '@core/services/projects.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
import site from '@core/data/site.json';

// Clients, process, skills, FAQ teaser and the hire call to action. All plain text and real links, so they sit in the server HTML.
@Component({
  selector: 'app-home-lower-sections',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="content-section" id="clients">
      <div class="container">
        <h2>{{ ui().clients.title }}</h2>
        <p class="section-lead">{{ ui().clients.text }}</p>
        <ul class="tag-list">
          @for (project of projects; track project.slug) {
            <li><a [routerLink]="langService.link('/work/' + project.slug)">{{ project.title }}</a></li>
          }
        </ul>
      </div>
    </section>

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
        <p class="section-lead ltr-text">{{ ui().skills.text }}</p>
      </div>
    </section>

    <section class="content-section" id="faq-teaser">
      <div class="container">
        <h2>{{ ui().faqTeaser.title }}</h2>
        @for (item of teaser(); track item.id) {
          <details class="faq-item">
            <summary><h3>{{ item.q }}</h3></summary>
            <p class="faq-answer">{{ item.a }}</p>
          </details>
        }
        <p class="mt-4"><a class="text-link" [routerLink]="langService.link('/faq')">{{ ui().faqTeaser.seeAll }}</a></p>
      </div>
    </section>

    <section class="content-section" id="hire">
      <div class="container">
        <div class="cta-band">
          <h2>{{ ui().hireCta.title }}</h2>
          <p>{{ ui().hireCta.text }}</p>
          <div class="cta-buttons">
            <a class="btn-link primary" [href]="'mailto:' + email">{{ ui().hireCta.email }}</a>
            <a class="btn-link" [href]="linkedin" target="_blank" rel="noopener noreferrer">{{ ui().hireCta.linkedin }}</a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeLowerSectionsComponent {
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  readonly projects = inject(ProjectsService).getAll();
  private readonly content = inject(ContentService);

  // The first three questions: who, how to hire, how much
  readonly teaser = computed(() =>
    ['who-is-kerllos-ayad', 'how-to-hire-a-shopify-developer-in-cairo', 'how-much-does-a-shopify-store-cost']
      .map(id => this.content.faqItem(id, this.langService.lang()))
      .filter((item): item is NonNullable<typeof item> => !!item)
  );
  readonly email = site.email;
  readonly linkedin = site.linkedin;
}
