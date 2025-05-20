import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadComponent: () => import('../../page-components/user-home/user-home.component').then(m => m.UserHomeComponent),
        title: 'Game Overview'
      },
      {
        path: 'settings',
        loadComponent: () => import('../../page-components/user-settings/user-settings.component').then(m => m.UserSettingsComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('../../page-components/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
      }
    ]
  }
];