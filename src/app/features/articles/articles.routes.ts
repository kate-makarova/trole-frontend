import { Routes } from '@angular/router';

export const ARTICLES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ':game_id',
        loadComponent: () => import('../../page-components/article/article.component').then(m => m.ArticleComponent)
      },
      {
        path: ':game_id/:id',
        loadComponent: () => import('../../page-components/article/article.component').then(m => m.ArticleComponent)
      },
      {
        path: 'create/:game_id',
        loadComponent: () => import('../../page-components/article-form/article-form.component').then(m => m.ArticleFormComponent)
      },
      {
        path: 'edit/:game_id/:id',
        loadComponent: () => import('../../page-components/article-form/article-form.component').then(m => m.ArticleFormComponent)
      }
    ]
  }
];