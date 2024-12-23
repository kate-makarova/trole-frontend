import {User} from './User';

export class ChatMessage {
  user: User;
  text: string;
  time: string;

  constructor(user: User, text: string, time: string) {
    this.user = user;
    this.text = text;
    this.time = time;
  }
}
