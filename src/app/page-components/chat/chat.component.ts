import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, shareReplay, Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ChatSubscriptionSimple} from "../../entities/ChatSubscriptionSimple";
import {ChatFormComponent} from "../../components/chat-form/chat-form.component";
import {SingleSocketChatService} from "../../services/single-socket-chat/single-socket-chat.service";

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    ChatFormComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  chatId: number|null;
  newMessage: string = ''
  createNewChatOpen: boolean = false
  chatsLoaded$: Observable<boolean> = of(false)
  socketConnectionEstablished$: Observable<boolean> = of(false)
  chatList$: Observable<ChatSubscriptionSimple[]> = of([])
  private subscriptions = new Subscription();

  constructor(private sessionService: SessionService,
              protected singleSocketChatService: SingleSocketChatService,
              private route: ActivatedRoute) {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.chatId)
    this.chatsLoaded$ = this.singleSocketChatService.chatsLoaded.asObservable().pipe(shareReplay(1))
    this.socketConnectionEstablished$ = this.singleSocketChatService.connectionEstablished.asObservable().pipe(shareReplay(1))
    this.chatList$ = this.singleSocketChatService.chatList.asObservable().pipe(shareReplay(1))
  }

  ngOnInit() {
    if(this.sessionService.getUser() === null) {return}

    this.subscriptions.add(this.chatsLoaded$.subscribe((loaded: boolean) => {
      if(!loaded) {return}
      if(this.chatId) {
        this.singleSocketChatService.switchActiveSubscription(this.chatId)
      }
      this.singleSocketChatService.loadHistory()
      this.singleSocketChatService.connect()
    }))

    this.subscriptions.add(this.socketConnectionEstablished$.subscribe((connected: boolean) => {
      if (!connected) {return}
      console.log(this.singleSocketChatService.chatList.getValue())
    }))

    this.singleSocketChatService.loadPrivateChats()
  }

  sendMessage(text: string) {
    const user = this.sessionService.getSimpleUser()
    if (user == null) {return}
    this.singleSocketChatService.sendMessage(user, text)
    this.newMessage = ''
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.singleSocketChatService.activeSubscription?.clearMessages()
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

  switchChat(id: number) {
    this.chatId = id;
    this.singleSocketChatService.switchActiveSubscription(id)
    this.singleSocketChatService.loadHistory()
  }
}
