import {User} from './User';

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
