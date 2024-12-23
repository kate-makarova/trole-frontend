import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {SocketService} from '../../services/socket/socket.service';
import {FormsModule} from '@angular/forms';
import {User} from '../../entities/User';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';
import {ChatMessage} from '../../entities/ChatMessage';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy {
  private messageSubscription: Subscription;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  user: User;

  constructor(private sessionService: SessionService, private socketService: SocketService) {
    this.user = this.sessionService.getUser();
    this.messageSubscription = this.socketService
      .on('message')
      .subscribe((data: ChatMessage) => {
        this.messages.push(data);
      });
  }

  sendMessage() {
    this.socketService.emit('message', {user: this.user, text: this.newMessage });
    this.newMessage = '';
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
