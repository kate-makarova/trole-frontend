import { Routes } from '@angular/router';

export const INVITATION_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ':key',
        loadComponent: () => import('../../page-components/invitation/invitation.component').then(m => m.InvitationComponent)
      }
    ]
  }
];