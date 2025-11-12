// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { AUTH_ROUTES } from './domain/auth/auth.routes';
import { DASHBOARD_ROUTES } from './domain/dashboard/dashboard.routes'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/layout/auth.layout/auth.layout.component').then(m => m.AuthLayoutComponent),
    children: AUTH_ROUTES
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./core/layout/dashboard.layout/dashboard.layout.component').then(m => m.DashboardLayoutComponent),
    children: DASHBOARD_ROUTES
  }
];