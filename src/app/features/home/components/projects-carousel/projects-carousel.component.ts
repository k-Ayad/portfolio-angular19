import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.scss']
})
export class ProjectsCarouselComponent implements OnInit, OnDestroy {
  
  private projectsService = inject(ProjectsService);

  // Projects loaded from JSON
  projects: Project[] = [];
  currentIndex: number = 0;
  private autoPlayInterval: any;
  private autoPlayDelay: number = 4000; // 4 seconds
  isHovered: boolean = false;
  isLoading: boolean = true;
  hasError: boolean = false;

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  /**
   * Load projects from JSON file via service
   */
  loadProjects(): void {
    this.isLoading = true;
    this.hasError = false;

    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
        
        // Start auto-play only if we have projects
        if (this.projects.length > 0) {
          this.startAutoPlay();
        }
      },
      error: (error) => {
        console.error('Failed to load projects:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    });
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
   * Show project details
   */
  showDetails(project: Project): void {
    console.log('Show details for:', project);
    // Implement navigation to project details page
    // this.router.navigate(['/project', project.id]);
    // Or use the project.link property if available
    // window.location.href = project.link;
  }

  /**
   * Retry loading projects (for error state)
   */
  retryLoad(): void {
    this.loadProjects();
  }
}
