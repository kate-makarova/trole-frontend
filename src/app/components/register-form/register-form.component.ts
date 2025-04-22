import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {UserService} from '../../services/user/user.service';
import {passwordMatchValidator} from '../../validators/passwordMatchValidator';
import {NgIf} from "@angular/common";
import {passwordDifficultyValidator} from '../../validators/passwordDifficultyValidator';


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
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeat_password: ['', Validators.required],
    invitation_key: ['']
  },
    {
      validators: [passwordMatchValidator(), passwordDifficultyValidator()]
    });
  alertMessage: string|null = null;
  @Input('invitation_key') invitation_key: string = '';
  @Output('redirect') emitRedirect: EventEmitter<boolean> = new EventEmitter;

  constructor(private userService: UserService) {
  }

  onSubmit() {
    if(this.registerForm.valid) {
      switch (this.page) {
        case 'invite':
          if (this.invitation_key.length) {
            this.registerForm.patchValue({invitation_key: this.invitation_key})
          }
          console.log(this.registerForm.value)
          this.onSubmitInvite()
          break;
        case 'admin':
          this.onSubmitAdmin()
          break;
      }
    } else {
      console.log(this.registerForm.errors);
    }
  }

  onSubmitInvite() {
      this.userService.userRegister(this.registerForm.value).subscribe((message) => {
        if (message === 'success') {
          this.emitRedirect.emit(true);
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
