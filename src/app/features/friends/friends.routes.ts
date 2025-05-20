import { Routes } from '@angular/router';

export const FRIENDS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'send-invitation',
        loadComponent: () => import('../../page-components/friends/send-invitation/send-invitation.component').then(m => m.SendInvitationComponent)
      }
    ]
  }
];