import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Router} from '@angular/router';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private sessionService: SessionService,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService) {

    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.sessionService.login(val.email, val.password)
        .subscribe(
          (val) => {
            if (val) {
              this.breadcrumbsService.addBreadcrumb('/home', 'My Games', 1)
              this.router.navigateByUrl('/home');
            } else {
              console.log("Error");
            }
          }
        );
    }
  }
}
