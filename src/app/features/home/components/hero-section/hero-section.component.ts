import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from "@angular/router";

interface SkillImage {
  src: string;
  alt: string;
  desktopPosition: { top: string; left: string };
  mobilePosition: { top: string; left: string };
  desktopWidth: string;
  mobileWidth: string;
  animationClass: string;
  isAnimating: boolean;
}

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnDestroy {
  skillsImages: SkillImage[] = [
    {
      src: 'assets/images/skills/angular-icon.svg',
      alt: 'Angular Icon',
      desktopPosition: { top: '10%', left: '0%' },
      mobilePosition: { top: '0%', left: '0%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/azure-icon.svg',
      alt: 'Azure Icon',
      desktopPosition: { top: '15%', left: '20%' },
      mobilePosition: { top: '0%', left: '25%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/bootstrap-fill.svg',
      alt: 'Bootstrap Icon',
      desktopPosition: { top: '40%', left: '10%' },
      mobilePosition: { top: '0%', left: '50%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/git-icon-logo.svg',
      alt: 'Git Icon',
      desktopPosition: { top: '40%', left: '30%' },
      mobilePosition: { top: '0%', left: '80%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/node-js.svg',
      alt: 'Node.js Icon',
      desktopPosition: { top: '40%', left: '58%' },
      mobilePosition: { top: '70%', left: '12%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/react.svg',
      alt: 'React Icon',
      desktopPosition: { top: '15%', left: '85%' },
      mobilePosition: { top: '70%', left: '38%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/shopify-logo.svg',
      alt: 'Shopify Icon',
      desktopPosition: { top: '40%', left: '80%' },
      mobilePosition: { top: '70%', left: '65%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    },
    {
      src: 'assets/images/skills/tailwind.svg',
      alt: 'Tailwind Icon',
      desktopPosition: { top: '15%', left: '70%' },
      mobilePosition: { top: '100%', left: '50%' },
      desktopWidth: '140px',
      mobileWidth: '100px',
      animationClass: '',
      isAnimating: false
    }
  ];

  private animationTimeouts = new Map<number, any>();

  onSkillHover(index: number): void {
    const skill = this.skillsImages[index];

    // Clear any existing timeout for this skill
    if (this.animationTimeouts.has(index)) {
      clearTimeout(this.animationTimeouts.get(index));
      this.animationTimeouts.delete(index);
    }

    // Start scale-up animation
    skill.animationClass = 'scale-up';
    skill.isAnimating = true;
  }

  onSkillLeave(index: number): void {
    const skill = this.skillsImages[index];

    // Clear any existing timeout
    if (this.animationTimeouts.has(index)) {
      clearTimeout(this.animationTimeouts.get(index));
    }

    // Wait for scale-up to complete (0.3s) + hold time (1s) = 1.3s total
    const timeout = setTimeout(() => {
      skill.animationClass = 'scale-down';

      // After scale-down animation completes (0.3s), reset
      const resetTimeout = setTimeout(() => {
        skill.animationClass = '';
        skill.isAnimating = false;
      }, 300);

      this.animationTimeouts.set(index, resetTimeout);
    }, 1300); // 0.3s (complete scale-up) + 1s (wait)

    this.animationTimeouts.set(index, timeout);
  }

  ngOnDestroy(): void {
    // Clean up all timeouts
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts.clear();
  }

  downloadResume(): void {
  const link = document.createElement('a');
  link.href = 'assets/resume/Kerllos-Ayad-Azer-Resume.pdf';
  link.download = 'Kerllos-Ayad-Resume.pdf';
  link.click();
}
}