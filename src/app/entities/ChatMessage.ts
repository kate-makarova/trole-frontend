import {ISimpleUser, SimpleUser} from "./SimpleUser";

export interface IChatMessage {
  chatId: number;
  id: number|null;
  type: string;
  user: ISimpleUser|null;
  text: string;
  time: string|null;
}

export class ChatMessage implements IChatMessage {
  chatId: number;
  id: number|null;
  type: string;
  user: SimpleUser|null;
  text: string;
  time: string|null;

  constructor(chatId: number, id: number|null, type: string, user: SimpleUser|null, text: string, time: string|null) {
    this.chatId = chatId;
    this.id = id;
    this.type = type;
    this.user = user;
    this.text = text;
    this.time = time;
  }
}
