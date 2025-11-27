import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
      skillsImages: any[] = [
        {
          src: 'assets/images/skills/angular-icon.svg',
          alt: 'Angular Icon',
          desktopPosition: { top: '10%', left: '0%' },
          mobilePosition: { top: '0%', left: '0%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/azure-icon.svg',
          alt: 'Azure Icon',
          desktopPosition: { top: '15%', left: '20%' }, 
          mobilePosition: { top: '0%', left: '25%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/bootstrap-fill.svg',
          alt: 'Bootstrap Icon',
          desktopPosition: { top: '40%', left: '10%' },
          mobilePosition: { top: '0%', left: '50%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/git-icon-logo.svg',
          alt: 'Git Icon',
          desktopPosition: { top: '40%', left: '30%' },
          mobilePosition: { top: '0%', left: '80%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/node-js.svg',
          alt: 'Node.js Icon',
          desktopPosition: { top: '40%', left: '58%' },
          mobilePosition: { top: '70%', left: '12%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/react.svg',
          alt: 'React Icon',
          desktopPosition: { top: '15%', left: '85%' },
          mobilePosition: { top: '70%', left: '38%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/shopify-logo.svg',
          alt: 'Shopify Icon',
          desktopPosition: { top: '40%', left: '80%' },
          mobilePosition: { top: '70%', left: '65%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        },
        {
          src: 'assets/images/skills/tailwind.svg',
          alt: 'Tailwind Icon',
          desktopPosition: { top: '15%', left: '70%' },
          mobilePosition: { top: '100%', left: '50%' },
          desktopWidth: '140px',
          mobileWidth: '100px'
        }
      ]
}
