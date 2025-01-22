import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../../validators/passwordMatchValidator';

@Component({
  selector: 'app-page-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.css'
})
export class PageFormComponent {
  private formBuilder = inject(FormBuilder);

  pageForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      path: ['', Validators.required],
      content: ['', Validators.required],
    });

  onSubmit() {
    console.log(this.pageForm.value)
  }
}
