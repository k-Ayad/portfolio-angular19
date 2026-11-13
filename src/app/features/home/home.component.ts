import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '@core/services/seo.service';
import { homeStructuredData } from '@core/seo/structured-data';
import site from '@core/data/site.json';
// import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsCarouselComponent } from './components/projects-carousel/projects-carousel.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ServicesSectionComponent } from './components/home-sections/services-section.component';
import { HomeLowerSectionsComponent } from './components/home-sections/home-lower-sections.component';
import { LangService } from '@core/i18n/lang.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    // HeroComponent,
    AboutComponent,
    ProjectsCarouselComponent,
    ContactComponent,
    HeroSectionComponent,
    ServicesSectionComponent,
    HomeLowerSectionsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);
  private langService = inject(LangService);

  ngOnInit(): void {
    const lang = this.langService.lang();
    this.seoService.setPageMeta({
      title: lang === 'ar' ? site.ar.homeTitle : site.homeTitle,
      description: lang === 'ar' ? site.ar.homeDescription : site.homeDescription,
      path: this.langService.link('/')
    });
    this.seoService.setStructuredData(homeStructuredData(lang));
  }
}
