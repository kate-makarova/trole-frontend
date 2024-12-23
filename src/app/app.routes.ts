import {Routes} from '@angular/router';
import {UserHomeComponent} from './page-components/user-home/user-home.component';
import {IndexComponent} from './page-components/index/index.component';
import {EpisodeComponent} from './page-components/episode/episode.component';
import {GameComponent} from './page-components/game/game.component';
import {ChatComponent} from './page-components/chat/chat.component';
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
    path: 'game/:id',
    title: 'Episodes',
    component: GameComponent,
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
