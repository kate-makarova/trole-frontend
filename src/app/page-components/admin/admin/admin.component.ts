import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {SessionService} from '../../../services/session/session.service';
import {AdminNavComponent} from '../admin-nav/admin-nav.component';

@Component({
  selector: 'app-admin',
  imports: [
    NgIf,
    AdminNavComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  gameSettingsTabId: string = 'admin-index';

  constructor(protected sessionService: SessionService) {
  }
}
