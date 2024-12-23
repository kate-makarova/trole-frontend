import { createAction, createReducer, on, createSelector } from '@ngrx/store';
import {User} from './entities/User';

export class AppState {
  user: User;

  constructor() {
    this.user = {
        id: 1,
        username: "viper",
        avatar: "",
        characters: [{
          id: 1,
          name: "Rapahel",
          image: "",
          is_mine: true
        }]
      }
  }
}

export const setUser = createAction(
  '[App] Set User',
  (user: User) => ({ user })
);

// Selector
// @ts-ignore
export const selectUser = (state: AppState) => state.user;
export const getUser = createSelector(selectUser, (user) => user);
