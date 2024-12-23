import {User} from './User';
import {SessionService} from '../services/session/session.service';

export class ChatRoom {
  id: number;
  title: string;
  users: User[] = []

  constructor(id: number, title: string, users: User[] = []) {
    this.id = id;
    this.title = title;
    this.users = users;
  }
}
