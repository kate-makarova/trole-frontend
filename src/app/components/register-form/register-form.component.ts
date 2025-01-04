import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {UserService} from '../../services/user/user.service';
import {passwordMatchValidator} from '../../validators/passwordMatchValidator';


@Component({
  selector: 'app-register-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    repeat_password: ['', Validators.required]
  },
    {
      validators: passwordMatchValidator()
    });

  constructor(private userService: UserService) {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }

  }
}
