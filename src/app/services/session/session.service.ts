import { Injectable } from '@angular/core';
import {User} from '../../entities/User';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User|null = null;
  private accessToken: string = '';
  private refreshToken: string = '';

  constructor(private http: HttpClient) {
    const session = localStorage.getItem('session')
    if(session) {
      const data = JSON.parse(session)
      this.accessToken = data.accessToken;
      this.user = data.user;
    }
  }

  getUser(): User|null {
    return this.user;
  }

  getToken(): string {
    return this.accessToken;
  }

  private getUserByUserName(login: string): Observable<any> {
    return this.http.get<any>(environment.apiHost+'user/get-by-username/'+login, {
      headers: {'Authorization': 'Bearer '+this.accessToken}
    });
  }

  private getAPIToken(login: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiHost+'token', {
      username: login, password: password
    })
  }

  login(login: string, password: string): Observable<boolean> {
    return this.getAPIToken(login, password).pipe(
      switchMap((response) => {
        if(!response.access) {
          return of(false);
        }
        console.log('First request successful', response);
        this.accessToken = response.access;
        this.refreshToken = response.refresh;
        return this.getUserByUserName(login).pipe(
          switchMap((secondResponse) => {
            if(!secondResponse.data) {
              return of(false);
            }
            this.user = secondResponse.data;
            localStorage.setItem("session", JSON.stringify({
              "user": this.user,
              "accessToken": this.accessToken
            }))
            return of(true);
          })
        );
      }),
      catchError((error) => {
        // Handle error if any request fails
        console.error('Error occurred:', error);
        return of(false);
      })
    )


    // return this.getAPIToken(login, password).pipe(map((t) => {
    //     if(t && this.user === null) {
    //       return this.getUserByUserName(login)
    //     } else {
    //       return false;
    //     }
    //   })).pipe(map((u) => {
    //     if (u) {
    //       localStorage.setItem("session", JSON.stringify({
    //         "user": this.user,
    //         "accessToken": this.accessToken
    //       }))
    //       return true;
    //     } else {
    //       return false;
    //     }
    // }))
  }
}
