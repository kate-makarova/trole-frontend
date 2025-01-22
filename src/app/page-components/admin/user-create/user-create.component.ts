import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RegisterFormComponent} from '../../../components/register-form/register-form.component';
import {SessionService} from '../../../services/session/session.service';
import {AdminNavComponent} from '../admin-nav/admin-nav.component';

@Component({
  selector: 'app-user-create',
  imports: [
    NgIf,
    RegisterFormComponent,
    AdminNavComponent
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  gameSettingsTabId: string = 'user-create';
  constructor(protected sessionService: SessionService) {
  }
}
