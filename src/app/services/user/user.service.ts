import { Injectable } from '@angular/core';
import {APIService} from '../apiservice/apiservice.service';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  userCreateAdmin(formData: any): Observable<number> {
    return this.postData('admin-user-create', formData);
  }

}
