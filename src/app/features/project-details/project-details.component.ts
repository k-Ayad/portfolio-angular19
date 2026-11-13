import { Component, OnInit, OnDestroy, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { SeoService } from '../../core/services/seo.service';
import { Project, ProjectImage } from '../../core/models/project.interface';
import { breadcrumbs, projectCreativeWork } from '../../core/seo/structured-data';
import { imageSize } from '../../core/utils/image';
import { LangService } from '../../core/i18n/lang.service';
import { UI } from '../../core/i18n/ui';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  readonly imageSize = imageSize;
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  text: { summary: string; problem?: string; built: string[] } = { summary: '', built: [] };
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
    this.text = this.projectsService.text(project, this.langService.lang());
    this.currentImageIndex = 0;
    this.updateSeo(project);
    this.setupCarousel();
    this.relatedProjects = this.projectsService.getRelated(project);
  }

  /**
   * Set page title, meta tags and JSON-LD for this project
   */
  private updateSeo(project: Project): void {
    const lang = this.langService.lang();
    const ui = UI[lang];
    const path = this.langService.link(`/work/${project.slug}`);
    const suffix = lang === 'ar' ? 'من تنفيذ Kerllos Ayad، مطور Shopify وAngular في القاهرة، مصر.' : 'Built by Kerllos Ayad, Shopify and Angular developer in Cairo, Egypt.';
    // Summary and suffix, plus what was built while it still fits in a search snippet
    let description = `${this.text.summary} ${suffix}`;
    const withBuilt = `${this.text.summary} ${(this.text.built[0] ?? '').replace(/\.$/, '')}. ${suffix}`;
    if (this.text.built.length > 0 && withBuilt.length <= 160) {
      description = withBuilt;
    }
    if (description.length > 160) {
      description = this.text.summary.length > 160 ? this.text.summary.slice(0, 157).trimEnd() + '...' : this.text.summary;
    }
    const longTitle = `${project.title} | ${project.category} ${ui.project.titleSuffix}`;
    const title = lang === 'ar'
      ? `${project.title} | ${ui.project.titleSuffix}`
      : longTitle.length <= 70 ? longTitle : `${project.title} | Kerllos Ayad`;

    this.seoService.setPageMeta({
      title,
      description,
      path,
      image: project.noScreenshot ? undefined : project.image,
      imageAlt: `${ui.project.screenshotOf} ${project.title}`
    });

    this.seoService.setStructuredData(
      projectCreativeWork(project, lang),
      breadcrumbs([
        { name: ui.home.breadcrumb, path: this.langService.link('/') },
        { name: ui.project.breadcrumbProjects, path: this.langService.link('/portfolio') },
        { name: project.title, path }
      ])
    );
  }

  /** Alt text of a screenshot in the current language */
  alt(image: ProjectImage): string {
    return this.langService.lang() === 'ar' && image.altAr ? image.altAr : image.alt;
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
      : [{ src: this.project.image, alt: `Screenshot of the ${this.project.title} website`, altAr: `${UI.ar.project.screenshotOf} ${this.project.title}` }];
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
