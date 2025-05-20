import { Routes } from '@angular/router';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        loadComponent: () => import('../../page-components/chat/chat.component').then(m => m.ChatComponent)
      }
    ]
  }
];