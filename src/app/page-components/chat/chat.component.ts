import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SocketService} from '../../services/socket/socket.service';
import {FormsModule} from '@angular/forms';
import {User} from '../../entities/User';
import {Store} from '@ngrx/store';
import {getUser, selectUser} from '../../app.state';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy {
  private messageSubscription: Subscription;
  messages: string[] = [];
  newMessage: string = '';
  user$: Observable<User>;

  constructor(private socketService: SocketService, private store: Store) {
    console.log('???')
    // @ts-ignore
    this.user$ = this.store.select(selectUser);
    console.log(this.user$)
    this.messageSubscription = this.socketService
      .on('message')
      .subscribe((data) => {
        this.messages.push(data.text);
      });
  }

  sendMessage() {
    this.socketService.emit('message', {user: this.user$, text: this.newMessage });
    this.newMessage = '';
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
