import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";
import {Observable, of, shareReplay, Subscription} from "rxjs";
import {Invitation} from "../../entities/Invitation";
import {InvitationService} from "../../services/invitation/invitation.service";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-invitation',
    imports: [
        TranslatePipe,
        FormsModule,
        ReactiveFormsModule,
        RegisterFormComponent,
        NgIf,
        AsyncPipe
    ],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css'
})
export class InvitationComponent implements OnInit {
    public invitation: Observable<Invitation|null> = of(null);
    public key: string|null;
    public canRegister: Observable<boolean> = of(false);

    constructor(private invitationService: InvitationService,
                private route: ActivatedRoute,
                private userService: UserService
                ) {
        this.key = this.route.snapshot.paramMap.get('key');
    }

    ngOnInit() {
        if(this.key == null) {return}
        this.invitationService.getInvitation(this.key).pipe(shareReplay(1))
            .subscribe((data: Invitation|null) => {
            if(data == null) {return}
            console.log(data.expirationDate.getDay())
                console.log(new Date())
            if (data.expirationDate > new Date() && !data.accepted)
            {
                console.log('date')
                this.canRegister = of(true);
            } else {
                console.log('no')
            }
            this.invitation = of(data);
        })
    }
}
