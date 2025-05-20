import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('../../page-components/admin/admin/admin.component').then(m => m.AdminComponent)
      },
      {
        path: 'user-create',
        loadComponent: () => import('../../page-components/admin/user-create/user-create.component').then(m => m.UserCreateComponent)
      },
      {
        path: 'page-create',
        loadComponent: () => import('../../page-components/admin/page-form/page-form.component').then(m => m.AdminPageFormComponent)
      },
      {
        path: 'user-list',
        loadComponent: () => import('../../page-components/admin/admin-user-list/admin-user-list.component').then(m => m.AdminUserListComponent)
      }
    ]
  }
];