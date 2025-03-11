import {SimpleUser} from "./SimpleUser";

export class ChatMessage {
  type: string;
  user: SimpleUser|null;
  text: string;
  time: string|null;

  constructor(type: string, user: SimpleUser|null, text: string, time: string|null) {
    this.type = type;
    this.user = user;
    this.text = text;
    this.time = time;
  }
}
