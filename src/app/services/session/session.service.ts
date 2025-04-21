import { Injectable } from '@angular/core';
import {User} from '../../entities/User';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, Subject, switchMap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SimpleUser} from "../../entities/SimpleUser";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User|null = null;
  private accessToken: string = '';
  private refreshToken: string = '';
  public initialized: Subject<boolean> = new Subject<boolean>();

   constructor(private http: HttpClient) {
     this.initialized.next(false);
  }

  async init() {
    const session = localStorage.getItem('session')

    if(session) {
      const data = JSON.parse(session)
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      const status = await this.refresh()
        if(status) {
          this.user = data.user;
        }
    }
    this.initialized.next(true);
  }

  updateSession(user: User, accessToken: string, refreshToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.initialized.next(true);
    localStorage.setItem("session", JSON.stringify({
      "user": this.user,
      "accessToken": this.accessToken,
      "refreshToken": this.refreshToken
    }))
  }

  getUser(): User|null {
    return this.user;
  }

  getSimpleUser(): SimpleUser|null {
     if (this.user == null) {return null}
     return new SimpleUser(this.user.id, this.user.username, this.user.avatar)
  }

  updateUser(patch: object): boolean {
     if(this.user == null) {
       return false;
     }
    for (const property in patch) {
      // @ts-ignore
      this.user[property] = patch[property]
    }
    localStorage.setItem("session", JSON.stringify({
      "user": this.user,
      "accessToken": this.accessToken,
      "refreshToken": this.refreshToken
    }))
    return true;
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

  private getAPIRefreshToken(): Observable<any> {
    return this.http.post<any>(environment.apiHost+'token/refresh', {
      token: this.refreshToken
    })
  }

  async refresh(): Promise<boolean> {
     if(this.refreshToken == undefined) {
       localStorage.removeItem('session')
       return false;
     }

    return await fetch(environment.apiHost+'token/refresh', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh: this.refreshToken
      })
    }).then((response) => {
      return response.json()
    }).then((data) => {
      this.accessToken = data.access;
      return true;
    })
      .catch((er) => {
        return false
      })
  }

  login(login: string, password: string): Observable<boolean> {
    return this.getAPIToken(login, password).pipe(
      switchMap((response) => {
        if(!response.access) {
          return of(false);
        }
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
              "accessToken": this.accessToken,
              "refreshToken": this.refreshToken
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
  }
}
