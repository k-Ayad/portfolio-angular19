import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Project } from '@core/models/project.interface';
import { ProjectsService } from '@core/services/projects.service';
import { SeoService } from '@core/services/seo.service';
import { imageSize } from '@core/utils/image';
import { breadcrumbs, portfolioCollectionPage } from '@core/seo/structured-data';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  readonly imageSize = imageSize;
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = [];
  activeFilter: string = 'All Projects';

  constructor(
    private projectsService: ProjectsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    const lang = this.langService.lang();
    const ui = UI[lang];
    this.seoService.setPageMeta({
      title: ui.portfolio.metaTitle,
      description: ui.portfolio.metaDescription,
      path: this.langService.link('/portfolio')
    });
    this.projects = this.projectsService.getAll();
    this.seoService.setStructuredData(
      portfolioCollectionPage(this.projects, lang),
      breadcrumbs([
        { name: ui.home.breadcrumb, path: this.langService.link('/') },
        { name: ui.project.breadcrumbProjects, path: this.langService.link('/portfolio') }
      ])
    );
    this.filteredProjects = this.projects;
    this.categories = this.projectsService.getCategories();
  }

  summary(project: Project): string {
    return this.projectsService.text(project, this.langService.lang()).summary;
  }

  categoryLabel(category: string): string {
    return this.ui().categories[category] ?? category;
  }

  /**
   * Filter projects by category
   */
  filterProjects(category: string): void {
    this.activeFilter = category;
    
    if (category === 'All Projects') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(
        project => project.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  /**
   * Get icon for category filter button
   */
  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'All Projects': 'fas fa-th',
      'Shopify': 'fab fa-shopify',
      'Angular': 'fab fa-angular',
      'Node.js': 'fab fa-node-js',
      'Web App': 'fas fa-globe',
      'Full Stack': 'fas fa-layer-group',
      'PWA': 'fas fa-mobile-alt'
    };
    
    return icons[category] || 'fas fa-code';
  }

  /**
   * Track by function for ngFor optimization
   */
  trackBySlug(index: number, project: Project): string {
    return project.slug;
  }

  /**
   * Track by function for category strings
   */
  trackByCategory(index: number, category: string): string {
    return category;
  }
}
