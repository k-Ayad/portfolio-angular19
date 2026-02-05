import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Project } from '@core/models/project.interface';
import { ProjectsService } from '@core/services/projects.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = [];
  activeFilter: string = 'All Projects';
  private destroy$ = new Subject<void>();

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all projects
   */
  private loadProjects(): void {
    this.projectsService.getAllProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects) => {
          this.projects = projects;
          this.filteredProjects = projects;
        },
        error: (error) => console.error('Error loading projects:', error)
      });
  }

  /**
   * Load available categories
   */
  private loadCategories(): void {
    this.projectsService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (error) => console.error('Error loading categories:', error)
      });
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
  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
  /**
 * Track by function for category strings
 */
trackByCategory(index: number, category: string): string {
  return category;
}
}
