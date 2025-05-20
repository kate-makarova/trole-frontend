import { Routes } from '@angular/router';

export const PAGE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ':path',
        loadComponent: () => import('../../page-components/page/page.component').then(m => m.PageComponent)
      }
    ]
  }
];