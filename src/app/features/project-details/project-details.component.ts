import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.interface';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  project?: Project;
  relatedProjects: Project[] = [];
  currentImageIndex: number = 0;
  carouselImages: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const projectId = +params['id'];
        this.loadProject(projectId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load project details
   */
  private loadProject(id: number): void {
    this.projectsService.getProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project) => {
          if (project) {
            this.project = project;
            this.setupCarousel();
            this.loadRelatedProjects();
          } else {
            this.router.navigate(['/all-projects']);
          }
        },
        error: (error) => {
          console.error('Error loading project:', error);
          this.router.navigate(['/all-projects']);
        }
      });
  }

  /**
   * Setup carousel images
   */
  private setupCarousel(): void {
    if (this.project) {
      // Use project images array if available, otherwise use main image
      this.carouselImages = this.project.images && this.project.images.length > 0
        ? this.project.images
        : [this.project.image];
    }
  }

  /**
   * Load related projects from the same category
   */
  private loadRelatedProjects(): void {
    if (!this.project) return;

    this.projectsService.getAllProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects) => {
          this.relatedProjects = projects
            .filter(p => 
              p.category === this.project?.category && 
              p.id !== this.project?.id
            )
            .slice(0, 3); // Get up to 3 related projects
        }
      });
  }

  /**
   * Navigate to previous image in carousel
   */
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.carouselImages.length - 1;
    }
  }

  /**
   * Navigate to next image in carousel
   */
  nextImage(): void {
    if (this.currentImageIndex < this.carouselImages.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  /**
   * Go to specific image in carousel
   */
  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  /**
   * Get icon for technology badge
   */
  getTechIcon(tech: string): string {
    const techLower = tech.toLowerCase();
    const icons: { [key: string]: string } = {
      'angular': 'fab fa-angular',
      'react': 'fab fa-react',
      'vue': 'fab fa-vuejs',
      'node.js': 'fab fa-node-js',
      'nodejs': 'fab fa-node-js',
      'shopify': 'fab fa-shopify',
      'typescript': 'fab fa-js',
      'javascript': 'fab fa-js',
      'html': 'fab fa-html5',
      'css': 'fab fa-css3-alt',
      'scss': 'fab fa-sass',
      'sass': 'fab fa-sass',
      'git': 'fab fa-git-alt',
      'github': 'fab fa-github',
      'docker': 'fab fa-docker',
      'aws': 'fab fa-aws',
      'mongodb': 'fas fa-database',
      'firebase': 'fas fa-fire',
      'postgresql': 'fas fa-database',
      'mysql': 'fas fa-database'
    };

    for (const key in icons) {
      if (techLower.includes(key)) {
        return icons[key];
      }
    }

    return 'fas fa-code';
  }

  /**
   * Navigate back to all projects
   */
  goBack(): void {
    this.router.navigate(['/all-projects']);
  }

  /**
   * Open external link
   */
  openLink(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByIndex(index: number): number {
    return index;
  }

  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
}
