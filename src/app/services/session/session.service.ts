import { Injectable } from '@angular/core';
import {User} from '../../entities/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User;

  constructor() {
    this.user =  {
      id: 1,
      username: "viper",
      avatar: "",
      characters: [{
        id: 1,
        name: "Rapahel",
        avatar: "",
        is_mine: true
      }]
    }
  }

  getUser(): User {
    return this.user;
  }
}
