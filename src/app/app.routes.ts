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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
