import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  @Input('tabId') tabId:string = ''
}
