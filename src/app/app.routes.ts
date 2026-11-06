import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectsService } from '@core/services/projects.service';

// Pages set their own title and meta tags through SeoService, so routes carry no `title`
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent)
  },
  {
    path: 'work/:slug',
    loadComponent: () => import('./features/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  },
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
