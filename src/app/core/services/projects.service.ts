import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  date: string;
  link?: string;
  github?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = [
    // Projects data will be added here
  ];

  constructor() { }

  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    const filtered = this.projects.filter(p => p.category === category);
    return of(filtered);
  }
}
