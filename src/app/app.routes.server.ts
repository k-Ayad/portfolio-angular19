import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProjectsService } from '@core/services/projects.service';

// Static prerendering: every page below becomes its own HTML file at build time
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'portfolio', renderMode: RenderMode.Prerender },
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => inject(ProjectsService).getAll().map(project => ({ slug: project.slug }))
  },
  // Redirect-only routes are handled in the browser
  { path: 'project/:id', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client }
];
