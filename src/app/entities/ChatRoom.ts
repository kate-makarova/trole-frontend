import {ISimpleUser, SimpleUser} from "./SimpleUser";
import {ChatMessage} from "./ChatMessage";

export interface IChatRoom {
  id: number;
  type: number;
  title: string;
  users: ISimpleUser[];
  unread: number;
}

export class ChatRoom implements IChatRoom {
  id: number;
  type: number;
  title: string;
  users: SimpleUser[] = [];
  unread: number = 0;

  constructor(id: number, type: number, title: string, users: SimpleUser[] = [], unread: number = 0) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.users = users;
    this.unread = unread;
  }
}
