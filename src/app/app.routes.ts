import { inject } from '@angular/core';
import { CanMatchFn, Routes } from '@angular/router';
import { ProjectsService } from '@core/services/projects.service';
import { ContentService } from '@core/services/content.service';
import { ARABIC_LIVE } from '@core/i18n/lang';

const projectExists: CanMatchFn = (_route, segments) =>
  !!inject(ProjectsService).getBySlug(segments[1]?.path);

const serviceExists: CanMatchFn = (_route, segments) =>
  !!inject(ContentService).getService(segments[1]?.path);

// The same pages exist in English (at the root) and, once reviewed, in Arabic (under /ar).
// Pages set their own title and meta tags through SeoService, so routes carry no `title`.
const pages = (): Routes => [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent)
  },
  {
    // Unknown slugs fall through to the 404 page
    path: 'work/:slug',
    canMatch: [projectExists],
    loadComponent: () => import('./features/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-hub.component').then(m => m.ServicesHubComponent)
  },
  {
    // Retired service page; the server also answers it with a 301
    path: 'services/web-apps-landing-pages',
    redirectTo: 'services/angular-web-app-development'
  },
  {
    path: 'services/:slug',
    canMatch: [serviceExists],
    loadComponent: () => import('./features/services/service-page.component').then(m => m.ServicePageComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq.component').then(m => m.FaqComponent)
  }
];

export const routes: Routes = [
  ...pages(),
  ...(ARABIC_LIVE ? [{ path: 'ar', children: pages() }] : []),
  {
    // Old project URLs (numeric id or old slug) now live under /work/<slug>
    path: 'project/:id',
    redirectTo: ({ params }) => {
      const slug = inject(ProjectsService).getSlugByLegacyId(params['id']);
      return slug ? `/work/${slug}` : '/portfolio';
    }
  },
  {
    // Not linked from any navigation; reachable only by direct URL (used as the Meta App privacy policy URL)
    path: 'privacy-policy',
    loadComponent: () => import('./features/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    // Unknown URLs: the server answers this route with HTTP 404 (see app.routes.server.ts)
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
