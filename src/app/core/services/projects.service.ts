import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  /**
   * Load projects from JSON file
   */
  private loadProjects(): void {
    this.http.get<{ projects: Project[] }>('assets/data/projects.json')
      .pipe(map(data => data.projects))
      .subscribe({
        next: (projects) => this.projectsSubject.next(projects),
        error: (error) => console.error('Error loading projects:', error)
      });
  }

  /**
   * Get all projects
   */
  getAllProjects(): Observable<Project[]> {
    return this.projects$;
  }

  /**
   * Get project by ID
   */
  getProjectById(id: number): Observable<Project | undefined> {
    return this.projects$.pipe(
      map(projects => projects.find(project => project.id === id))
    );
  }

  /**
   * Filter projects by category
   */
  filterByCategory(category: string): Observable<Project[]> {
    if (category.toLowerCase() === 'all projects' || !category) {
      return this.projects$;
    }
    
    return this.projects$.pipe(
      map(projects => projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      ))
    );
  }

  /**
   * Get featured projects
   */
  getFeaturedProjects(): Observable<Project[]> {
    return this.projects$.pipe(
      map(projects => projects.filter(project => project.featured))
    );
  }

  /**
   * Search projects by keyword
   */
  searchProjects(keyword: string): Observable<Project[]> {
    const searchTerm = keyword.toLowerCase();
    return this.projects$.pipe(
      map(projects => projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      ))
    );
  }

  /**
   * Get unique categories
   */
  getCategories(): Observable<string[]> {
    return this.projects$.pipe(
      map(projects => {
        const categories = projects.map(project => project.category);
        return ['All Projects', ...Array.from(new Set(categories))];
      })
    );
  }
}
