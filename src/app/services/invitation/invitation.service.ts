import { Injectable } from '@angular/core';
import {APIService} from "../apiservice/apiservice.service";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session/session.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  sendInvitation(email: string) {
    return this.postData<boolean>('invitation-send', {receiver_email: email})
  }
}
