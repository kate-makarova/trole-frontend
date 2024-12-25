import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  path: string = '';

  constructor(public sessionService: SessionService, private router: Router, private location: Location) {
    this.path = this.location.path().split('/')[1];
    this.router.events.subscribe(event => {
        this.path = this.location.path().split('/')[1];
    });
  }

}
