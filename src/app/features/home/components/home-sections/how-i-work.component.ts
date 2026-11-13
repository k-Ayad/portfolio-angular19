import { Component, computed, inject } from '@angular/core';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';

// "How I work": four numbered steps, in one row on desktop. Numbers and titles are real text.
@Component({
  selector: 'app-how-i-work',
  standalone: true,
  template: `
    <section class="content-section how-i-work" id="process">
      <div class="container">
        <h2>{{ ui().process.title }}</h2>
        <p class="section-lead">{{ ui().process.intro }}</p>
        <ol class="how-steps">
          @for (step of ui().process.steps; track step.title; let i = $index) {
            <li class="how-step">
              <span class="step-number">{{ numbers()[i] }}</span>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-text">{{ step.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `
})
export class HowIWorkComponent {
  private readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  // Arabic-Indic numerals on the Arabic pages
  readonly numbers = computed(() => (this.langService.lang() === 'ar' ? ['١', '٢', '٣', '٤'] : ['1', '2', '3', '4']));
}
