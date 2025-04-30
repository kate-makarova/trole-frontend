import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-friends-nav',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './friends-nav.component.html',
  styleUrl: './friends-nav.component.css'
})
export class FriendsNavComponent {
  @Input('tabId') tabId:string = ''
}
