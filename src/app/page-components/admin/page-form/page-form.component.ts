import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {SessionService} from '../../../services/session/session.service';
import {AdminNavComponent} from '../admin-nav/admin-nav.component';

@Component({
  selector: 'app-page-form',
  imports: [
    NgIf,
    AdminNavComponent
  ],
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.css'
})
export class PageFormComponent {
  gameSettingsTabId: string = 'page-create';

  constructor(protected sessionService: SessionService) {
  }
}
