import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';
import {RegisterFormComponent} from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-admin',
  imports: [
    NgIf,
    RegisterFormComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(protected sessionService: SessionService) {
  }
}
