import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  constructor(public sessionService: SessionService) {
  }

}
