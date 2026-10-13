import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '@core/services/seo.service';
// import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsCarouselComponent } from './components/projects-carousel/projects-carousel.component';
import { ContactComponent } from './components/contact/contact.component';
import { ClientsFeedbackComponent } from './components/clients-feedback/clients-feedback.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    // HeroComponent,
    AboutComponent,
    ProjectsCarouselComponent,
    ContactComponent,
    ClientsFeedbackComponent,
    HeroSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'Kerllos Ayad | Frontend Developer & Shopify Specialist',
      description: 'Senior Frontend Engineer with 4+ years of experience in Angular, Shopify Theme Development, and modern web technologies.',
      path: '/'
    });
  }
}
