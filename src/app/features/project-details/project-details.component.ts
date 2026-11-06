import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { SeoService } from '../../core/services/seo.service';
import { Project, ProjectImage } from '../../core/models/project.interface';
import { breadcrumbs, projectCreativeWork } from '../../core/seo/structured-data';
import { imageSize } from '../../core/utils/image';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  readonly imageSize = imageSize;
  project?: Project;
  relatedProjects: Project[] = [];
  currentImageIndex: number = 0;
  carouselImages: ProjectImage[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.loadProject(params['slug']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load project details
   */
  private loadProject(slug: string): void {
    const project = this.projectsService.getBySlug(slug);
    if (!project) {
      return;
    }

    this.project = project;
    this.currentImageIndex = 0;
    this.updateSeo(project);
    this.setupCarousel();
    this.relatedProjects = this.projectsService.getRelated(project);
  }

  /**
   * Set page title, meta tags and JSON-LD for this project
   */
  private updateSeo(project: Project): void {
    const path = `/work/${project.slug}`;
    const description = project.summary.length > 160
      ? project.summary.slice(0, 157).trimEnd() + '...'
      : project.summary;

    this.seoService.setPageMeta({
      title: `${project.title} | ${project.category} project by Kerllos Ayad, Cairo`,
      description,
      path,
      image: project.noScreenshot ? undefined : project.image,
      imageAlt: `Screenshot of the ${project.title} website`
    });

    this.seoService.setStructuredData(
      projectCreativeWork(project),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/portfolio' },
        { name: project.title, path }
      ])
    );
  }

  /**
   * Setup carousel images (screenshots only, never a placeholder)
   */
  private setupCarousel(): void {
    if (!this.project || this.project.noScreenshot) {
      this.carouselImages = [];
      return;
    }
    this.carouselImages = this.project.images?.length
      ? this.project.images
      : [{ src: this.project.image, alt: `Screenshot of the ${this.project.title} website` }];
  }

  previousImage(): void {
    this.currentImageIndex = this.currentImageIndex > 0
      ? this.currentImageIndex - 1
      : this.carouselImages.length - 1;
  }

  nextImage(): void {
    this.currentImageIndex = this.currentImageIndex < this.carouselImages.length - 1
      ? this.currentImageIndex + 1
      : 0;
  }

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

  trackByIndex(index: number): number {
    return index;
  }

  trackBySlug(index: number, project: Project): string {
    return project.slug;
  }
}
