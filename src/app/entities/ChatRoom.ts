import {SimpleUser} from "./SimpleUser";
import {ChatMessage} from "./ChatMessage";

export class ChatRoom {
  id: number;
  type: number;
  title: string;
  users: SimpleUser[] = [];
  unread: number = 0;
  messages: ChatMessage[] = [];

  constructor(id: number, type: number, title: string, users: SimpleUser[] = [], unread: number = 0) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.users = users;
    this.unread = unread;
  }
}
