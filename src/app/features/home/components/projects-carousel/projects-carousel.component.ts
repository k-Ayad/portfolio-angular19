import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project.interface';
import { ProjectsService } from '@core/services/projects.service';
@Component({
  selector: 'app-projects-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.scss']
})
export class ProjectsCarouselComponent implements OnInit, OnDestroy {
  
  private projectsService = inject(ProjectsService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // number of projects to show in carousel (for performance)
  limit: number = 10;

  // Projects with a real screenshot show in the carousel; every project is linked in `allProjects`
  allProjects: Project[] = [];
  projects: Project[] = [];
  currentIndex: number = 0;
  private autoPlayInterval: any;
  private autoPlayDelay: number = 4000; // 4 seconds
  isHovered: boolean = false;

  ngOnInit(): void {
    this.allProjects = this.projectsService.getAll();
    this.projects = this.allProjects.filter(project => !project.noScreenshot).slice(0, this.limit);

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
}
