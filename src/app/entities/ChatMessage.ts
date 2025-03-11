import {SimpleUser} from "./SimpleUser";

export class ChatMessage {
  id: number|null;
  type: string;
  user: SimpleUser|null;
  text: string;
  time: string|null;

  constructor(id: number|null, type: string, user: SimpleUser|null, text: string, time: string|null) {
    this.id = id;
    this.type = type;
    this.user = user;
    this.text = text;
    this.time = time;
  }
}
