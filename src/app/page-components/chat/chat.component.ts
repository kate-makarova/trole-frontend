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
  initiated: Observable<boolean> = of(false);
  sendMessageFunc: Function = () => {}

  constructor(private sessionService: SessionService,
              private chatService: ChatService,
              private route: ActivatedRoute) {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if(this.sessionService.getUser() === null) {return}

    this.initiated.subscribe((state: boolean) => {
      if (!state) {return}
      const subscription: ChatSubscription|undefined = this.chatService.getChatSubscription(this.chatId)
      if(subscription == undefined) {return}
      this.chat = subscription.chat
      this.messages$ = subscription.messages$
      this.chats$ = this.chatService.getChats()
      this.sendMessageFunc = subscription.sendMessage
    })

    // @ts-ignore
    this.chatService.initiateChats(this.sessionService.getUser().id, initiated)
  }

  sendMessage(text: string) {
    this.sendMessageFunc(this.sessionService.getUser(), text)
  }
}
