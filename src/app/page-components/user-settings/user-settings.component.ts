import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleEntity} from "../../entities/SimpleEntity";

@Component({
  selector: 'app-user-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    theme: ['light', Validators.required],
  });

  onSubmit() {
    console.log(this.form.value)
  }
}
