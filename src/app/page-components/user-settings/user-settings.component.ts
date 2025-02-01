import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleEntity} from "../../entities/SimpleEntity";
import {SessionService} from '../../services/session/session.service';
import {NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'app-user-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSwitchDefault
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  private formBuilder = inject(FormBuilder);
  private sessionService = inject(SessionService);
  form = this.formBuilder.group({
    theme: [this.sessionService.getUser()?.theme, Validators.required],
  });

  constructor() {
    console.log(this.sessionService.getUser())
  }


  onSubmit() {
    console.log(this.form.value)
  }
}
