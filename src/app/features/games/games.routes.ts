import { Routes } from '@angular/router';

// NOTE: This module is currently not used because games are considered the main functionality
// of the site and are included in the initial bundle rather than being lazy-loaded.
// See app.routes.ts for the actual routes.

export const GAMES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('../../page-components/games/games.component').then(m => m.GamesComponent),
        title: 'All Games'
      },
      {
        path: ':id',
        loadComponent: () => import('../../page-components/game/game.component').then(m => m.GameComponent),
        title: 'Episodes'
      },
      {
        path: 'create',
        loadComponent: () => import('../../page-components/game-form/game-form.component').then(m => m.GameFormComponent),
        title: 'Create Game'
      },
      {
        path: 'settings',
        children: [
          {
            path: 'game-edit/:game_id',
            loadComponent: () => import('../../page-components/game-settings/game-edit/game-edit.component').then(m => m.GameEditComponent),
            title: 'Game Settings - Edit Game'
          },
          {
            path: 'character-sheet/:game_id',
            loadComponent: () => import('../../page-components/game-settings/character-sheet/game-settings-character-sheet.component').then(m => m.GameSettingsCharacterSheetComponent),
            title: 'Game Settings - Character Sheet'
          }
        ]
      }
    ]
  }
];
