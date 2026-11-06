import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Project } from '@core/models/project.interface';
import { ProjectsService } from '@core/services/projects.service';
import { SeoService } from '@core/services/seo.service';
import { imageSize } from '@core/utils/image';
import { breadcrumbs, portfolioCollectionPage } from '@core/seo/structured-data';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  readonly imageSize = imageSize;
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = [];
  activeFilter: string = 'All Projects';

  constructor(
    private projectsService: ProjectsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'Shopify & Angular Projects | Kerllos Ayad – Cairo, Egypt',
      description: 'Shopify stores, Angular applications and Node.js projects built by Kerllos Ayad, Shopify developer and Senior Frontend Engineer in Cairo, Egypt.',
      path: '/portfolio'
    });
    this.projects = this.projectsService.getAll();
    this.seoService.setStructuredData(
      portfolioCollectionPage(this.projects),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/portfolio' }
      ])
    );
    this.filteredProjects = this.projects;
    this.categories = this.projectsService.getCategories();
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
