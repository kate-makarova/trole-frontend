import {Routes} from '@angular/router';
import {UserHomeComponent} from './user-home/user-home.component';
export const routes: Routes = [
  {
    path: 'home',
    title: 'Game Overview',
    component: UserHomeComponent,
  },
];
