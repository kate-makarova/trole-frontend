import {Routes} from '@angular/router';
import {UserHomeComponent} from './page-components/user-home/user-home.component';
import {IndexComponent} from './page-components/index/index.component';
import {EpisodeListComponent} from './page-components/episode-list/episode-list.component';
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
    component: EpisodeListComponent,
  },
];
