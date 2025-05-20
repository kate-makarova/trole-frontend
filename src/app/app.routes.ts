import { Routes, PreloadAllModules } from '@angular/router';
import { IndexComponent } from './page-components/index/index.component';
import { GameComponent } from './page-components/game/game.component';
import { GamesComponent } from './page-components/games/games.component';
import { GameFormComponent } from './page-components/game-form/game-form.component';
import { GameEditComponent } from './page-components/game-settings/game-edit/game-edit.component';
import { GameSettingsCharacterSheetComponent } from './page-components/game-settings/character-sheet/game-settings-character-sheet.component';
import { EpisodeComponent } from './page-components/episode/episode.component';
import { EpisodeFormComponent } from './page-components/episode-form/episode-form.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: IndexComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
  },
  // Games and Episodes are the main functionality of the site, so they are not lazy-loaded
  {
    path: 'games',
    title: 'All Games',
    component: GamesComponent
  },
  {
    path: 'game/:id',
    title: 'Episodes',
    component: GameComponent
  },
  {
    path: 'game-create',
    title: 'Create Game',
    component: GameFormComponent
  },
  {
    path: 'game-settings/game-edit/:game_id',
    title: 'Game Settings - Edit Game',
    component: GameEditComponent
  },
  {
    path: 'game-settings/character-sheet/:game_id',
    title: 'Game Settings - Character Sheet',
    component: GameSettingsCharacterSheetComponent
  },
  {
    path: 'episode/:id',
    component: EpisodeComponent
  },
  {
    path: 'episode-create/:id',
    title: 'Create Episode',
    component: EpisodeFormComponent
  },
  {
    path: 'episode-edit/:id',
    title: 'Edit Episode',
    component: EpisodeFormComponent
  },
  {
    path: 'character',
    loadChildren: () => import('./features/characters/characters.routes').then(m => m.CHARACTERS_ROUTES)
  },
  {
    path: 'chat',
    loadChildren: () => import('./features/chat/chat.routes').then(m => m.CHAT_ROUTES)
  },
  {
    path: 'article',
    loadChildren: () => import('./features/articles/articles.routes').then(m => m.ARTICLES_ROUTES)
  },
  {
    path: 'page',
    loadChildren: () => import('./features/page/page.routes').then(m => m.PAGE_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'invitation',
    loadChildren: () => import('./features/invitation/invitation.routes').then(m => m.INVITATION_ROUTES)
  },
  {
    path: 'friends',
    loadChildren: () => import('./features/friends/friends.routes').then(m => m.FRIENDS_ROUTES)
  },
  // Redirects for backward compatibility
  {
    path: 'login',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'user/home',
    pathMatch: 'full'
  },
  {
    path: 'user-settings',
    redirectTo: 'user/settings',
    pathMatch: 'full'
  }
];
