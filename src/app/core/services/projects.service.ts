import { Injectable } from '@angular/core';
import { Project } from '../models/project.interface';
import { Lang } from '../i18n/lang';
import data from '../data/projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // Bundled at build time, so it is available during prerendering without an HTTP call
  private readonly projects = (data.projects as Project[]).filter(project => !project.hidden);

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

  /** The featured projects of one pillar that have a real screenshot (three per pillar) */
  getFeatured(category: string): Project[] {
    return this.projects.filter(project => project.featured && project.category === category && !project.noScreenshot);
  }

  getCategories(): string[] {
    return ['All Projects', ...Array.from(new Set(this.projects.map(project => project.category)))];
  }

  getRelated(project: Project, limit = 3): Project[] {
    return this.projects
      .filter(p => p.category === project.category && p.slug !== project.slug)
      .slice(0, limit);
  }

  /**
   * Text of a project in the given language. Titles, client names and the stack stay in Latin letters.
   */
  text(project: Project, lang: Lang): { summary: string; problem?: string; built: string[] } {
    if (lang === 'ar' && project.ar) {
      return project.ar;
    }
    return { summary: project.summary, problem: project.problem, built: project.built };
  }
}
