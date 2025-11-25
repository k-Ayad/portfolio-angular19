import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsCarouselComponent } from './components/projects-carousel/projects-carousel.component';
import { ContactComponent } from './components/contact/contact.component';
import { ClientsFeedbackComponent } from './components/clients-feedback/clients-feedback.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ProjectsCarouselComponent,
    ContactComponent,
    ClientsFeedbackComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
