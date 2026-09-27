import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home | Kerllos Portfolio'
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent),
    title: 'Portfolio | Kerllos Portfolio'
  },
  {
    path: 'project/:id',
    loadComponent: () => import('./features/project-details/project-details.component').then(m => m.ProjectDetailsComponent),
    title: 'Project Details | Kerllos Portfolio'
  },
  {
    // Not linked from any navigation; reachable only by direct URL (used as the Meta App privacy policy URL)
    path: 'privacy-policy',
    loadComponent: () => import('./features/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Privacy Policy | K-Ayad'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
