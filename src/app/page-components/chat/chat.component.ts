import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {SocketService} from '../../services/socket/socket.service';
import {FormsModule} from '@angular/forms';
import {User} from '../../entities/User';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';
import {ChatMessage} from '../../entities/ChatMessage';
import {ChatSubscription} from "../../entities/ChatSubscription";
import {ChatService} from "../../services/chat/chat.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ChatRoom} from "../../entities/ChatRoom";
import {SimpleEntity} from "../../entities/SimpleEntity";
import {ChatSubscriptionSimple} from "../../entities/ChatSubscriptionSimple";
import {SessionInitComponent} from "../../components/session-init/session-init.component";
import {ChatFormComponent} from "../../components/chat-form/chat-form.component";

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink,
    ChatFormComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent extends SessionInitComponent implements OnInit, OnDestroy {
  chatId: number;
  chat$: Observable<ChatRoom|null> = of(null);
  oldMessages$: Observable<ChatMessage[]> = of([])
  messages$: Observable<ChatMessage[]> = of([])
  chats$: Array<ChatSubscriptionSimple> = []
  newMessage: string = ''
  init: Observable<boolean> = of(false)
  createNewChatOpen: boolean = false

  constructor(sessionService: SessionService,
              protected chatService: ChatService,
              private route: ActivatedRoute) {
    super(sessionService);
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
  }

  override ngOnInit() {
    super.ngOnInit();
    this.oldMessages$ = this.chatService.getMessages(this.chatId)
    this.chat$ = this.chatService.getChat(this.chatId)
  }

  onSessionInit() {
    if(this.sessionService.getUser() === null) {return}

    this.init = this.chatService.init.asObservable()

    this.init.subscribe((state: boolean) => {
      if (!state) {return}
      const subscription: ChatSubscription|undefined = this.chatService.getChatSubscription(this.chatId)
      if(subscription == undefined) {return}
      this.messages$ = subscription.messages$
      this.chats$ = this.chatService.getChats()
    })

    // @ts-ignore
    this.chatService.initiateChats()
  }

  sendMessage(text: string) {
    const user = this.sessionService.getSimpleUser()
    if (user == null) {return}
    try {
      this.chatService.getChatSubscription(this.chatId)?.sendMessage(user, text)
      this.newMessage = ''
    } catch(e) {

    }
  }

  ngOnDestroy() {
    this.chatService.stopChats()
  }

  startChatFormOpen() {
    this.createNewChatOpen = !this.createNewChatOpen
  }

  protected readonly onsubmit = onsubmit;

  onNewChatClose() {
    this.createNewChatOpen = false;
  }

  onNewChatCreate() {
    this.createNewChatOpen = false;
  }
}
