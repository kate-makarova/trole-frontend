import {Routes} from '@angular/router';
import {UserHomeComponent} from './page-components/user-home/user-home.component';
import {IndexComponent} from './page-components/index/index.component';
import {EpisodeComponent} from './page-components/episode/episode.component';
import {GameComponent} from './page-components/game/game.component';
import {ChatComponent} from './page-components/chat/chat.component';
import {LoginComponent} from './page-components/login/login.component';
import {GameFormComponent} from './page-components/game-form/game-form.component';
import {CharacterListComponent} from './page-components/character-list/character-list.component';
import {Episode} from './entities/Episode';
import {EpisodeFormComponent} from './page-components/episode-form/episode-form.component';
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
    path: 'episode/:id',
    component: EpisodeComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
];
