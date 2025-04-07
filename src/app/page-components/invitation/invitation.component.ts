import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-invitation',
    imports: [
        TranslatePipe,
        FormsModule,
        ReactiveFormsModule,
        RegisterFormComponent
    ],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css'
})
export class InvitationComponent {
    public referer: string = '';
}
