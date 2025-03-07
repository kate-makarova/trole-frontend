import {User} from './User';
import {SessionService} from '../services/session/session.service';
import {ChatMessage} from "./ChatMessage";
import {isPackageNameSafeForAnalytics} from "@angular/cli/src/analytics/analytics";

export class ChatRoom {
  id: number;
  title: string;
  users: User[] = [];
  unread: number = 0

  constructor(id: number, title: string, users: User[] = [], unread: number = 0) {
    this.id = id;
    this.title = title;
    this.users = users;
    this.unread = unread;
  }
}
