import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvitationService} from "../../services/invitation/invitation.service";

@Component({
  selector: 'app-send-invitation',
    imports: [
        FormsModule
    ],
  templateUrl: './send-invitation.component.html',
  styleUrl: './send-invitation.component.css'
})
export class SendInvitationComponent {
  public email: string = '';

  public constructor(private invitationService: InvitationService) {
  }

  sendInvitation() {
    if(this.email.length) {
      this.invitationService.sendInvitation(this.email).subscribe(() => {
        console.log('Sent')
      })
    } else {
      console.log('Empty email')
    }
  }
}
