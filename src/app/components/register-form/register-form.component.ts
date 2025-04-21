import {Component, inject, Input} from '@angular/core';
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
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  @Input('page') page:string = 'invite';
  private formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    repeat_password: ['', Validators.required],
    invitation_key: ['']
  },
    {
      validators: passwordMatchValidator()
    });
  alertMessage: string|null = null;
  @Input('invitation_key') invitation_key: string = '';

  constructor(private userService: UserService) {
  }

  onSubmit() {
    switch(this.page) {
      case 'invite':
        if(this.invitation_key.length) {
          this.registerForm.patchValue({invitation_key: this.invitation_key})
        }
        console.log(this.registerForm.value)
        this.onSubmitInvite()
            break;
      case 'admin':
        this.onSubmitAdmin()
            break;
    }
  }

  onSubmitInvite() {
    this.userService.userRegister(this.registerForm.value).subscribe((message) => {
      if (message === 'success') {

      } else {
        this.alertMessage = message;
      }
    })
  }

  onSubmitAdmin() {
    if (this.registerForm.valid) {
      this.userService.userCreateAdmin(this.registerForm.value).subscribe(
        data => {
          console.log(data);
        }
      )
    } else {
      console.log('Form is invalid');
    }

  }
}
