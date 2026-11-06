import { Injectable } from '@angular/core';
import { Project } from '../models/project.interface';
import data from '../data/projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // Bundled at build time, so it is available during prerendering without an HTTP call
  private readonly projects = data.projects as Project[];

  getAll(): Project[] {
    return this.projects;
  }

  getBySlug(slug: string): Project | undefined {
    return this.projects.find(project => project.slug === slug);
  }

  /**
   * Map an old /project/:id value (numeric id or old slug) to the new slug
   */
  getSlugByLegacyId(id: string): string | undefined {
    return this.projects.find(project => project.legacyIds.includes(id))?.slug;
  }

  getCategories(): string[] {
    return ['All Projects', ...Array.from(new Set(this.projects.map(project => project.category)))];
  }

  getRelated(project: Project, limit = 3): Project[] {
    return this.projects
      .filter(p => p.category === project.category && p.slug !== project.slug)
      .slice(0, limit);
  }
}
