import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { ProjectsService } from '@core/services/projects.service';

// Known pages are prerendered to HTML at build time; anything else is rendered by the server as a 404 page
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'portfolio', renderMode: RenderMode.Prerender },
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    // Unknown slugs are not handled here, so server.ts answers them with the 404 page
    fallback: PrerenderFallback.None,
    getPrerenderParams: async () => inject(ProjectsService).getAll().map(project => ({ slug: project.slug }))
  },
  // Old project URLs are 301-redirected in server.ts; this only covers in-app navigation
  { path: 'project/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server, status: 404 }
];
