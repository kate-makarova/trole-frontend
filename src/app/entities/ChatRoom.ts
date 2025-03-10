import {User} from './User';
import {SessionService} from '../services/session/session.service';
import {ChatMessage} from "./ChatMessage";
import {isPackageNameSafeForAnalytics} from "@angular/cli/src/analytics/analytics";

export class ChatRoom {
  id: number;
  type: number;
  title: string;
  users: User[] = [];
  unread: number = 0

  constructor(id: number, type: number, title: string, users: User[] = [], unread: number = 0) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.users = users;
    this.unread = unread;
  }
}
