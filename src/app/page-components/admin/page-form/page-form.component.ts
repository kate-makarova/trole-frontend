import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {SessionService} from '../../../services/session/session.service';
import {AdminNavComponent} from '../admin-nav/admin-nav.component';
import {PageFormComponent} from '../../../components/page-form/page-form.component';

@Component({
  selector: 'app-admin-page-form',
  imports: [
    NgIf,
    AdminNavComponent,
    PageFormComponent
  ],
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.css'
})
export class AdminPageFormComponent {
  gameSettingsTabId: string = 'page-create';

  constructor(protected sessionService: SessionService) {
  }
}
