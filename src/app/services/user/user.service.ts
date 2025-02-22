import { Injectable } from '@angular/core';
import {APIService} from '../apiservice/apiservice.service';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../entities/User';

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

  userListAdmin(page: number = 1): Observable<User[]> {
    return this.getData('admin-user-list/'+page)
  }

  userSettingsUpdate(user_id: number, formData: any): Observable<boolean> {
    return this.postData('user-settings-update/'+user_id, formData)
  }

}
