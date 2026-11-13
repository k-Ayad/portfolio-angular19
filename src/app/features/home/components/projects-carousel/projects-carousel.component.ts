import { Component, OnInit, OnDestroy, PLATFORM_ID, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project.interface';
import { ProjectsService } from '@core/services/projects.service';
import { imageSize } from '@core/utils/image';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
@Component({
  selector: 'app-projects-carousel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.scss']
})
export class ProjectsCarouselComponent implements OnInit, OnDestroy {
  
  readonly imageSize = imageSize;
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  private projectsService = inject(ProjectsService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // number of projects to show in carousel (for performance)
  limit: number = 10;

  // The six featured projects (three Shopify, three Angular) with a real screenshot; the tabs filter them
  featured: Project[] = [];
  projects: Project[] = [];
  tab: 'all' | 'Shopify' | 'Angular' = 'all';
  currentIndex: number = 0;
  private autoPlayInterval: any;
  private autoPlayDelay: number = 4000; // 4 seconds
  isHovered: boolean = false;

  ngOnInit(): void {
    const shopify = this.projectsService.getFeatured('Shopify');
    const angular = this.projectsService.getFeatured('Angular');
    // Interleaved so "All" alternates between the two pillars
    this.featured = shopify.flatMap((project, i) => (angular[i] ? [project, angular[i]] : [project]));
    this.projects = this.featured;

    // Auto-play only runs in the browser; a timer would keep the prerender from finishing
    if (this.isBrowser && this.projects.length > 0) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  /**
   * Start auto-play carousel
   */
  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      if (!this.isHovered) {
        this.next();
      }
    }, this.autoPlayDelay);
  }

  /**
   * Stop auto-play carousel
   */
  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  /**
   * Go to next slide
   */
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  /**
   * Go to previous slide
   */
  prev(): void {
    this.currentIndex = this.currentIndex === 0 
      ? this.projects.length - 1 
      : this.currentIndex - 1;
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  /**
   * Get active project
   */
  get activeProject(): Project | null {
    return this.projects[this.currentIndex] || null;
  }

  /**
   * Get slide position class
   */
  getSlideClass(index: number): string {
    const diff = index - this.currentIndex;
    const total = this.projects.length;
    
    // Handle wrap-around for circular carousel
    let position = diff;
    if (diff > total / 2) {
      position = diff - total;
    } else if (diff < -total / 2) {
      position = diff + total;
    }

    if (position === 0) return 'active';
    if (position === 1) return 'next';
    if (position === -1) return 'prev';
    if (position > 1) return 'next-hidden';
    return 'prev-hidden';
  }

  /**
   * Handle mouse enter - pause auto-play
   */
  onMouseEnter(): void {
    this.isHovered = true;
  }

  /**
   * Handle mouse leave - resume auto-play
   */
  onMouseLeave(): void {
    this.isHovered = false;
  }

  /**
   * Summary of the active project in the current language
   */
  get activeSummary(): string {
    return this.activeProject ? this.projectsService.text(this.activeProject, this.langService.lang()).summary : '';
  }

  screenshotAlt(project: Project): string {
    return `${this.ui().project.screenshotOf} ${project.title}`;
  }

  /**
   * Switch the filter tab; the carousel restarts on the first project of that tab
   */
  selectTab(tab: 'all' | 'Shopify' | 'Angular'): void {
    this.tab = tab;
    this.projects = tab === 'all' ? this.featured : this.featured.filter(project => project.category === tab);
    this.currentIndex = 0;
  }
}
