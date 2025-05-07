import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {AsyncPipe, Location, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {SingleSocketChatService} from "../../services/single-socket-chat/single-socket-chat.service";
import {Observable, of, shareReplay} from "rxjs";

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit {
  path: string = '';
  param: number = 0;
  last_opened_chat$: Observable<number|null|false> = of(false);

  constructor(public sessionService: SessionService,
              private router: Router,
              private location: Location,
              private chatService: SingleSocketChatService) {
    this.path = this.location.path().split('/')[1];
    this.router.events.subscribe(event => {
        this.path = this.location.path().split('/')[1];
        switch (this.path) {
          case 'game':
            this.param = Number(this.location.path().split('/')[2]);
            break;
        }
    });
    this.last_opened_chat$ = this.chatService.lastOpenedChat.asObservable().pipe(shareReplay(1));
  }

  ngOnInit() {
    this.chatService.getLastOpenedChat()
  }

    logOut($event: MouseEvent) {
        this.sessionService.logout();
    }
}
