import { Injectable } from '@angular/core';
import {SocketService} from "../socket/socket.service";
import {ChatMessage} from "../../entities/ChatMessage";
import {SessionService} from "../session/session.service";
import {ChatSubscription} from "../../entities/ChatSubscription";
import {BehaviorSubject, Observable} from "rxjs";
import {SimpleUser} from "../../entities/SimpleUser";
import {ChatSubscriptionSimple} from "../../entities/ChatSubscriptionSimple";
import {APIService} from "../apiservice/apiservice.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ChatRoom} from "../../entities/ChatRoom";

@Injectable({
  providedIn: 'root'
})
export class SingleSocketChatService extends APIService {
  socket: SocketService<ChatMessage>;
  private subscriptions: ChatSubscription[] = []
  chatsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  connectionEstablished: BehaviorSubject<boolean> = new BehaviorSubject(false)
  activeSubscription: ChatSubscription | null = null
  chatList: BehaviorSubject<ChatSubscriptionSimple[]> = new BehaviorSubject<ChatSubscriptionSimple[]>([])
  lastOpenedChat: BehaviorSubject<number|null> = new BehaviorSubject<number|null>(null)


  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
    this.socket = new SocketService<ChatMessage>()

    this.socket.onOpen().subscribe((data: any) => {
      this.connectionEstablished.next(true)
      const user = this.sessionService.getUser();
      if (user != null) {
        this.sendMessage(new SimpleUser(user.id, user.username, ''), '', 'user_online')
        this.sendMessage(new SimpleUser(user.id, user.username, ''), '', 'get_users_online')
      }
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

      if(data.type == 'user_online' && data.user !== null) {
        const s = this.subscriptions.find((elem: ChatSubscription) => {
          return elem.chat.id == data.chatId
        })
        if (s) {
          s.addUserOnline(data.user)
        }
      }

      if(data.type == 'user_offline' && data.user !== null) {
        const s = this.subscriptions.find((elem: ChatSubscription) => {
          return elem.chat.id == data.chatId
        })
        if (s) {
          s.removeUserOnline(data.user)
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

  sendMessage(user: SimpleUser, text: string, type = 'user_message') {
    if(!this.activeSubscription) {
      return
    }

    const message = new ChatMessage(
      this.activeSubscription.chat.id,
      null,
      type,
      user,
      text,
      new Date().toString(),
  );
    this.socket.sendMessage(message);
    this.activeSubscription.addMessage(message)
  }

  loadPrivateChats() {
    this.subscriptions = []
    return this.getData<ChatRoom[]>('active-chats').subscribe((data: ChatRoom[]) => {
      for(let chat of data) {
        this.subscriptions.push(new ChatSubscription(chat))
      }
      this.updateChatList()
      this.chatsLoaded.next(true)
    })
  }

  loadHistory() {
    if(!this.activeSubscription) {return}
    if(!this.activeSubscription.historyLoaded) {
      this.loadPreviousMessages()
      this.activeSubscription.historyLoaded = true
    }
  }

  loadPreviousMessages(offset: number = 0, limit: number = 20) {
    if(!this.activeSubscription) {return}
    this.getData<ChatMessage[]>('private-chat-messages/'+this.activeSubscription.chat.id).subscribe((data: ChatMessage[]) => {
      this.activeSubscription?.addMessagesToBeginning(data)
    })
  }

  connect() {
    if(!this.sessionService.getUser()) {return}
    this.socket.connect('wss://d8amop4uwi.execute-api.us-east-1.amazonaws.com/production?token='+this.sessionService.getUser()?.id+'&chatIds='+this.subscriptions.map((elem: ChatSubscription) => {return elem.chat.id}).join(','))
   // this.socket.connect('wss://d8amop4uwi.execute-api.us-east-1.amazonaws.com/production?token='+this.sessionService.getToken())
  }

  kill() {
    const user = this.sessionService.getUser();
    if (user != null) {
      this.sendMessage(new SimpleUser(user.id, user.username, ''), '', 'user_offline')
    }
    this.socket.closeConnection()
  }

  getLastOpenedChat(): void {
    this.getData<number>('last-open-chat').subscribe((data: number) => {
      this.lastOpenedChat.next(data)
    })
  }
}
