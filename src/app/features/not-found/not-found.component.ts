import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  private seoService = inject(SeoService);
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);

  ngOnInit(): void {
    const ui = this.ui().notFound;
    this.seoService.setNotFoundMeta(ui.metaTitle, ui.metaDescription, this.langService.lang());
    this.seoService.setStructuredData();
  }
}
