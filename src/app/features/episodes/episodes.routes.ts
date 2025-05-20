import { Routes } from '@angular/router';

// NOTE: This module is currently not used because episodes are considered the main functionality
// of the site and are included in the initial bundle rather than being lazy-loaded.
// See app.routes.ts for the actual routes.

export const EPISODES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        loadComponent: () => import('../../page-components/episode/episode.component').then(m => m.EpisodeComponent)
      },
      {
        path: 'create/:id',
        loadComponent: () => import('../../page-components/episode-form/episode-form.component').then(m => m.EpisodeFormComponent),
        title: 'Create Episode'
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('../../page-components/episode-form/episode-form.component').then(m => m.EpisodeFormComponent),
        title: 'Edit Episode'
      }
    ]
  }
];
