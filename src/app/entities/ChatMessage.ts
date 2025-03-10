import {SimpleUser} from "./SimpleUser";

export class ChatMessage {
  type: string;
  user: SimpleUser|null;
  message: string;
  time: string|null;

  constructor(type: string, user: SimpleUser|null, message: string, time: string|null) {
    this.type = type;
    this.user = user;
    this.message = message;
    this.time = time;
  }
}
