import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { ProjectsService } from '@core/services/projects.service';
import { ContentService } from '@core/services/content.service';
import { ARABIC_LIVE } from '@core/i18n/lang';

// Known pages are prerendered to HTML at build time; anything else is rendered by the server as a 404 page.
// Unknown slugs are not handled here, so server.ts answers them with the 404 page.
const pages = (prefix: string): ServerRoute[] => {
  const p = (path: string) => (prefix ? (path ? `${prefix}/${path}` : prefix) : path);
  return [
    { path: p(''), renderMode: RenderMode.Prerender },
    { path: p('portfolio'), renderMode: RenderMode.Prerender },
    { path: p('services'), renderMode: RenderMode.Prerender },
    { path: p('faq'), renderMode: RenderMode.Prerender },
    {
      path: p('services/:slug'),
      renderMode: RenderMode.Prerender,
      fallback: PrerenderFallback.None,
      getPrerenderParams: async () => inject(ContentService).getServices().map(service => ({ slug: service.slug }))
    },
    {
      path: p('work/:slug'),
      renderMode: RenderMode.Prerender,
      fallback: PrerenderFallback.None,
      getPrerenderParams: async () => inject(ProjectsService).getAll().map(project => ({ slug: project.slug }))
    }
  ];
};

export const serverRoutes: ServerRoute[] = [
  ...pages(''),
  ...(ARABIC_LIVE ? pages('ar') : []),
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  // Old project URLs are 301-redirected in server.ts; this only covers in-app navigation
  { path: 'project/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server, status: 404 }
];
