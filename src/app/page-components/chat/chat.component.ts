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
import {SingleSocketChatService} from "../../services/single-socket-chat/single-socket-chat.service";

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
  chatId: number|null;
  newMessage: string = ''
  createNewChatOpen: boolean = false
  chatsLoaded$: Observable<boolean> = of(false)
  socketConnectionEstablished$: Observable<boolean> = of(false)
  chatList$: Observable<ChatSubscriptionSimple[]> = of([])
  activeSubscription: ChatSubscription|null = null


  constructor(sessionService: SessionService,
              protected singleSocketChatService: SingleSocketChatService,
              private route: ActivatedRoute) {
    super(sessionService);
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
    this.chatsLoaded$ = this.singleSocketChatService.chatsLoaded.asObservable()
    this.socketConnectionEstablished$ = this.singleSocketChatService.connectionEstablished.asObservable()
    this.chatList$ = this.singleSocketChatService.chatList.asObservable()
  }

  onSessionInit() {
    if(this.sessionService.getUser() === null) {return}

    this.chatsLoaded$.subscribe((loaded: boolean) => {
      if(!loaded) {return}
      this.singleSocketChatService.connect()
    })

    this.socketConnectionEstablished$.subscribe((connected: boolean) => {
      if (!connected) {return}
      console.log(this.singleSocketChatService.chatList.getValue())
      if(this.chatId) {
        this.singleSocketChatService.switchActiveSubscription(this.chatId)
        this.activeSubscription = this.singleSocketChatService.activeSubscription
      }
    })

    this.singleSocketChatService.loadPrivateChats()
  }

  sendMessage(text: string) {
    const user = this.sessionService.getSimpleUser()
    if (user == null) {return}
    this.singleSocketChatService.sendMessage(user, text)
  }

  ngOnDestroy() {
    this.singleSocketChatService.kill()
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
