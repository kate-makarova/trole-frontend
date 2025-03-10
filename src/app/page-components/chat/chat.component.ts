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

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatId: number;
  chat: ChatRoom|null = null;
  messages$: Observable<ChatMessage[]> = of([])
  chats$: Array<ChatSubscriptionSimple> = []
  newMessage: string = ''
  sendMessageFunc: Function = () => {}
  init: Observable<boolean> = of(false)

  constructor(private sessionService: SessionService,
              protected chatService: ChatService,
              private route: ActivatedRoute) {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    console.log(1)
    if(this.sessionService.getUser() === null) {
      console.log('What?')
      return}

    this.init = this.chatService.init.asObservable()

    this.init.subscribe((state: boolean) => {
      console.log(4)
      if (!state) {return}
      const subscription: ChatSubscription|undefined = this.chatService.getChatSubscription(this.chatId)
      console.log(5)
      if(subscription == undefined) {return}
      console.log(6)
      this.chat = subscription.chat
      this.messages$ = subscription.messages$
      this.chats$ = this.chatService.getChats()
      this.sendMessageFunc = subscription.sendMessage
    })

    // @ts-ignore
    this.chatService.initiateChats(this.sessionService.getUser().id)
  }

  sendMessage(text: string) {
    this.sendMessageFunc(this.sessionService.getUser(), text)
  }
}
