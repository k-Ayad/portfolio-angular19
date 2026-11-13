import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  readonly currentYear = new Date().getFullYear();
}
