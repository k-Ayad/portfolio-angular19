import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private jsonPath = 'assets/data/projects.json';

  /**
   * Load all projects from JSON file
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<{ projects: Project[] }>(this.jsonPath).pipe(
      map(response => response.projects),
      catchError(error => {
        console.error('Error loading projects:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  /**
   * Get project by ID
   */
  getProjectById(id: number): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(projects => projects.find(p => p.id === id))
    );
  }

  /**
   * Get featured projects only
   */
  getFeaturedProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(p => p.featured))
    );
  }

  /**
   * Get projects by category
   */
  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(p => 
        p.category?.toLowerCase() === category.toLowerCase()
      ))
    );
  }

  /**
   * Get projects by technology
   */
  getProjectsByTechnology(technology: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(p => 
        p.technologies?.some(tech => 
          tech.toLowerCase().includes(technology.toLowerCase())
        )
      ))
    );
  }
}
