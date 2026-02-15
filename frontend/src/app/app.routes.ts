import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/home/home').then(m => m.Home)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/list/list').then(m => m.List)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }

];
