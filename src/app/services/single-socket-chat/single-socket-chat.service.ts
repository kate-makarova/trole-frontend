import { Injectable, OnDestroy } from '@angular/core';
import {SocketService} from "../socket/socket.service";
import {ChatMessage} from "../../entities/ChatMessage";
import {SessionService} from "../session/session.service";
import {ChatSubscription} from "../../entities/ChatSubscription";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SimpleUser} from "../../entities/SimpleUser";
import {ChatSubscriptionSimple} from "../../entities/ChatSubscriptionSimple";
import {APIService} from "../apiservice/apiservice.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ChatRoom} from "../../entities/ChatRoom";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SingleSocketChatService extends APIService implements OnDestroy {
  private destroy$ = new Subject<void>();
  socket: SocketService<ChatMessage>;
  private subscriptions: ChatSubscription[] = []
  chatsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  connectionEstablished: BehaviorSubject<boolean> = new BehaviorSubject(false)
  activeSubscription: ChatSubscription | null = null
  chatList: BehaviorSubject<ChatSubscriptionSimple[]> = new BehaviorSubject<ChatSubscriptionSimple[]>([])
  lastOpenedChat: BehaviorSubject<number|null> = new BehaviorSubject<number|null>(null)
  open: boolean = false
  globalUnread: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0)

  /**
   * Finds a subscription by chat ID
   * @param chatId The ID of the chat to find
   * @returns The found subscription or undefined if not found
   */
  private findSubscriptionByChatId(chatId: number): ChatSubscription | undefined {
    return this.subscriptions.find((elem: ChatSubscription) => elem.chat.id === chatId);
  }


  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
    this.socket = new SocketService<ChatMessage>()

    this.socket.onOpen()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.connectionEstablished.next(true)
      })

    this.socket.onMessage<ChatMessage>()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChatMessage) => {
      if(!open) {
        this.globalUnread.next((this.globalUnread.value ?? 0) + 1)
        return
      }

      if (data.type == 'user_message') {
        const s = this.findSubscriptionByChatId(data.chatId);
        if (s) {
          s.addMessage(data)
          if(s !== this.activeSubscription) {
            s.incrementUnread()
          }
        }
      }

      if(data.type == 'user_online' && data.user !== null) {
        const s = this.findSubscriptionByChatId(data.chatId);
        if (s) {
          s.addUserOnline(data.user)
        }
      }

      if(data.type == 'user_offline' && data.user !== null) {
        const s = this.findSubscriptionByChatId(data.chatId);
        if (s) {
          s.removeUserOnline(data.user)
        }
      }

      if(data.type == 'users_currently_online') {
        const s = this.findSubscriptionByChatId(data.chatId);
        if(s) {
          s.setUsersOnline(JSON.parse(data.text))
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
    if(this.activeSubscription) {
      this.postDataFireAndForget('last-read-message-date/update', {"chat_type": 1, "chat_id": this.activeSubscription.chat.id, "last_read_message_date": new Date().toString()});
    }
    const s = this.findSubscriptionByChatId(chatId);
    if (s) {
      this.activeSubscription = s
      const user = this.sessionService.getUser();
      if (user != null) {
        this.sendMessage(new SimpleUser(user.id, user.username, ''), '', 'user_online')
        this.sendMessage(new SimpleUser(user.id, user.username, ''), '', 'get_users_online')
      }
    }
  }

  updateLastOpenedChat() {
    if(!this.activeSubscription) {
      return
    }
    const chatId = this.activeSubscription?.chat.id;
    this.postDataFireAndForget('last-open-chat/update', {"chat_id": chatId});
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
    if(type == 'user_message') {
      this.activeSubscription.addMessage(message)
    }
  }

  loadPrivateChats() {
    this.subscriptions = []
    return this.getData<ChatRoom[]>('active-chats')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChatRoom[]) => {
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
      this.activeSubscription.currentHistoryPage = 1
    }
  }

  loadPreviousMessages() {
    if(this.activeSubscription === null) {return}
    this.activeSubscription.currentHistoryPage++
    this.getData<ChatMessage[]>('private-chat-messages/'+this.activeSubscription.chat.id+'/'+this.activeSubscription.currentHistoryPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChatMessage[]) => {
        if(data.length < 20 && this.activeSubscription) {
          this.activeSubscription.canBeMore = false
        }
        this.activeSubscription?.addMessagesToBeginning(data)
      })
  }

  connect() {
    if(!this.sessionService.getUser()) {return}
    this.socket.connect(environment.websocketUrl + '?token='
        +this.sessionService.getUser()?.id
        +'&userName='+this.sessionService.getUser()?.username
        +'&chatIds='+this.subscriptions.map((elem: ChatSubscription) => {return elem.chat.id}).join(','))
   // this.socket.connect(environment.websocketUrl + '?token='+this.sessionService.getToken())
  }

  getGlobalUnread(): void {
    // Use getData with takeUntil instead of getDataAndUpdateSubject
    this.getData<number | null>('total-private-unread')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number | null) => {
        this.globalUnread.next(data);
      });
  }

  kill() {
    const user = this.sessionService.getUser();
    if (user != null) {
      this.sendMessage(new SimpleUser(user.id, user.username, ''), '', 'user_offline')
    }
    this.socket.closeConnection()
  }

  getLastOpenedChat(): void {
    // Use getData with takeUntil instead of getDataAndUpdateSubject
    this.getData<number>('last-open-chat')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        this.lastOpenedChat.next(data);
      });
  }

  loadHeaderChatData(): void {
    this.getData<any>('header-chat-data')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.globalUnread.next(data.unread)
        this.lastOpenedChat.next(data.last_chat)
      })
  }

  create(data: any): void {
    this.postData('private-chat/create', data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.loadPrivateChats()
        }
      });
  }

  ngOnDestroy(): void {
    // Complete the subject to notify all subscriptions to unsubscribe
    this.destroy$.next();
    this.destroy$.complete();

    // Clean up WebSocket connections
    this.kill();
  }
}
