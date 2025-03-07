import {SimpleUser} from "./SimpleUser";

export class ChatMessage {
  user: SimpleUser;
  text: string;
  time: string;

  constructor(user: SimpleUser, text: string, time: string) {
    this.user = user;
    this.text = text;
    this.time = time;
  }
}
