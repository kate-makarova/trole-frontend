import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';
import {ChatSubscription} from "../../entities/ChatSubscription";
import {ActivatedRoute, RouterLink} from "@angular/router";
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
      if(this.chatId) {
        this.singleSocketChatService.switchActiveSubscription(this.chatId)
        this.activeSubscription = this.singleSocketChatService.activeSubscription
      }
      this.singleSocketChatService.loadPreviousMessages()
      this.singleSocketChatService.connect()
    })

    this.socketConnectionEstablished$.subscribe((connected: boolean) => {
      if (!connected) {return}
      console.log(this.singleSocketChatService.chatList.getValue())
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
