import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {SocketService} from '../../services/socket/socket.service';
import {FormsModule} from '@angular/forms';
import {User} from '../../entities/User';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';
import {ChatMessage} from '../../entities/ChatMessage';
import {ChatSubscription} from "../../entities/ChatSubscription";
import {ChatService} from "../../services/chat/chat.service";
import {ActivatedRoute} from "@angular/router";
import {ChatRoom} from "../../entities/ChatRoom";

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatId: number;
  chat: ChatRoom|null = null;
  messages$: Observable<ChatMessage[]> = of([])
  unreads$: Array<Observable<number>> = []
  newMessage: string = ''
  sendMessageFunc: Function = () => {}

  constructor(private sessionService: SessionService,
              private chatService: ChatService,
              private route: ActivatedRoute) {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if(this.sessionService.getUser() === null) {return}
    let initiated: Observable<boolean> = of(false);

    initiated.subscribe((state: boolean) => {
      if (!state) {return}
      const subscription: ChatSubscription|undefined = this.chatService.getChatSubscription(this.chatId)
      if(subscription == undefined) {return}
      this.chat = subscription.chat
      this.messages$ = subscription.messages$
      this.unreads$ = this.chatService.getUnreadSubscriptions()
      this.sendMessageFunc = subscription.sendMessage
    })

    // @ts-ignore
    this.chatService.initiateChats(this.sessionService.getUser().id, initiated)
  }

  sendMessage(text: string) {
    this.sendMessageFunc(this.sessionService.getUser(), text)
  }
}
