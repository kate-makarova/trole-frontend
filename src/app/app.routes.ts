import {Routes} from '@angular/router';
import {UserHomeComponent} from './page-components/user-home/user-home.component';
import {IndexComponent} from './page-components/index/index.component';
import {EpisodeComponent} from './page-components/episode/episode.component';
import {GameComponent} from './page-components/game/game.component';
import {ChatComponent} from './page-components/chat/chat.component';
import {LoginComponent} from './page-components/login/login.component';
import {GameFormComponent} from './page-components/game-form/game-form.component';
import {CharacterListComponent} from './page-components/character-list/character-list.component';
import {EpisodeFormComponent} from './page-components/episode-form/episode-form.component';
import {CharacterFormComponent} from './page-components/character-form/character-form.component';
import {ArticleComponent} from './page-components/article/article.component';
import {AdminComponent} from './page-components/admin/admin/admin.component';
import {ArticleFormComponent} from './page-components/article-form/article-form.component';
import {GamesComponent} from "./page-components/games/games.component";
import {GameSettingsCharacterSheetComponent} from './page-components/game-settings/character-sheet/game-settings-character-sheet.component';
import {PageComponent} from "./page-components/page/page.component";
import {CharacterSheetComponent} from './page-components/character-sheet/character-sheet.component';
import {UserCreateComponent} from './page-components/admin/user-create/user-create.component';
import {AdminPageFormComponent} from './page-components/admin/page-form/page-form.component';
import {UserSettingsComponent} from './page-components/user-settings/user-settings.component';
export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: IndexComponent,
  },
  {
    path: 'home',
    title: 'Game Overview',
    component: UserHomeComponent,
  },
  {
    path: 'games',
    title: 'All Games',
    component: GamesComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'game/:id',
    title: 'Episodes',
    component: GameComponent,
  },
  {
    path: 'game-create',
    title: 'Create Game',
    component: GameFormComponent,
  },
  {
    path: 'game-settings/character-sheet/:game_id',
    title: 'Game Settings - Character Sheet',
    component: GameSettingsCharacterSheetComponent,
  },
  {
    path: 'character/:id',
    title: 'Character Sheet',
    component: CharacterSheetComponent,
  },
  {
    path: 'character-create/:id',
    title: 'Create Character',
    component: CharacterFormComponent,
  },
  {
    path: 'character-list/:id',
    title: 'Character List',
    component: CharacterListComponent,
  },
  {
    path: 'episode-create/:id',
    title: 'Create Episode',
    component: EpisodeFormComponent,
  },
  {
    path: 'episode-edit/:id',
    title: 'Edit Episode',
    component: EpisodeFormComponent,
  },
  {
    path: 'episode/:id',
    component: EpisodeComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
  {
    path: 'article/:game_id',
    component: ArticleComponent,
  },
  {
    path: 'article/:game_id/:id',
    component: ArticleComponent,
  },
  {
    path: 'article-create/:game_id',
    component: ArticleFormComponent,
  },
  {
    path: 'article-edit/:game_id/:id',
    component: ArticleFormComponent,
  },
  {
    path: 'page/:category/:path',
    component: PageComponent,
  },
  {
    path: 'page/:path',
    component: PageComponent,
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/user-create',
    component: UserCreateComponent,
  },
  {
    path: 'admin/page-create',
    component: AdminPageFormComponent,
  },
];
