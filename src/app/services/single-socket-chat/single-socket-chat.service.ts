import { Injectable } from '@angular/core';
import {SocketService} from "../socket/socket.service";
import {ChatMessage} from "../../entities/ChatMessage";
import {SessionService} from "../session/session.service";
import {ChatSubscription} from "../../entities/ChatSubscription";
import {BehaviorSubject} from "rxjs";
import {SimpleUser} from "../../entities/SimpleUser";
import {ChatRoom} from "../../entities/ChatRoom";
import {ChatSubscriptionSimple} from "../../entities/ChatSubscriptionSimple";

@Injectable({
  providedIn: 'root'
})
export class SingleSocketChatService {
  socket: SocketService<ChatMessage>;
  private subscriptions: ChatSubscription[] = []
  chatsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  connectionEstablished: BehaviorSubject<boolean> = new BehaviorSubject(false)
  activeSubscription: ChatSubscription | null = null
  chatList: BehaviorSubject<ChatSubscriptionSimple[]> = new BehaviorSubject<ChatSubscriptionSimple[]>([])

  constructor(private sessionService: SessionService) {
    this.socket = new SocketService<ChatMessage>()

    this.socket.onOpen().subscribe((data: any) => {
      this.connectionEstablished.next(true)
    })

    this.socket.onMessage<ChatMessage>().subscribe((data: ChatMessage) => {
      if (data.type == 'user_message') {
        const s = this.subscriptions.find((elem: ChatSubscription) => {
          return elem.chat.id == data.chatId
        })
        if (s) {
          s.addMessage(data)
        }
      }
    })
  }

  updateChatList() {
    const data: ChatSubscriptionSimple[] = []
    for (let subscription of this.subscriptions) {
      data.push({id: subscription.chat.id, title: subscription.chat.title, unread$: subscription.unread$})
    }
    this.chatList.next(data)
  }

  switchActiveSubscription(chatId: number) {
    const s = this.subscriptions.find((elem: ChatSubscription) => {return elem.chat.id == chatId})
    if (s) {
      this.activeSubscription = s
    }
  }

  sendMessage(user: SimpleUser, text: string) {
    if(!this.activeSubscription) {
      return
    }

    const message = new ChatMessage(
      this.activeSubscription.chat.id,
      null,
      'user_message',
      user,
      text,
      new Date().toString(),
  );
    console.log(message)
    this.socket.sendMessage(message);
    this.activeSubscription.addMessage(message)
  }

  loadPrivateChats() {
    const chats = [
        new ChatRoom(1, 2, 'Test 1', [], 0),
        new ChatRoom(2, 2, 'Test 2', [], 0)
    ]

      for (let chat of chats) {
        this.subscriptions.push(new ChatSubscription(this.sessionService, chat))
      }
      this.updateChatList()
    this.chatsLoaded.next(true)
  }

  connect() {
    this.socket.connect('wss://d8amop4uwi.execute-api.us-east-1.amazonaws.com/production?token='+this.sessionService.getToken())
  }

  kill() {
    this.socket.closeConnection()
  }
}
