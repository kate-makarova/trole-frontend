import { Routes } from '@angular/router';

export const CHARACTERS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list/:id',
        loadComponent: () => import('../../page-components/character-list/character-list.component').then(m => m.CharacterListComponent),
        title: 'Character List'
      },
      {
        path: ':id',
        loadComponent: () => import('../../page-components/character-sheet/character-sheet.component').then(m => m.CharacterSheetComponent),
        title: 'Character Sheet'
      },
      {
        path: 'create/:id',
        loadComponent: () => import('../../page-components/character-form/character-form.component').then(m => m.CharacterFormComponent),
        title: 'Create Character'
      },
      {
        path: 'edit/:id/:character_id',
        loadComponent: () => import('../../page-components/character-form/character-form.component').then(m => m.CharacterFormComponent),
        title: 'Edit Character'
      },
      {
        path: 'moderate/:id',
        loadComponent: () => import('../../page-components/character-moderate-form/character-moderate-form.component').then(m => m.CharacterModerateFormComponent),
        title: 'Moderate Character'
      }
    ]
  }
];