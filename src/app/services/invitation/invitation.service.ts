import { Injectable } from '@angular/core';
import {APIService} from "../apiservice/apiservice.service";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session/session.service";
import {Router} from "@angular/router";
import {Invitation} from "../../entities/Invitation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getInvitation(key: string): Observable<Invitation> {
    return this.getData<Invitation>('invitation/'+key)
  }

  sendInvitation(email: string):Observable<boolean> {
    return this.postData<boolean>('invitation-send', {receiver_email: email})
  }
}
