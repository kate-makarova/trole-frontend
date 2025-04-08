import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiResponse} from '../../entities/ApiResponse';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {SimpleEntity} from "../../entities/SimpleEntity";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient,
              protected sessionService: SessionService,
              private router: Router) {
  }

  private static isValidDate(value: string): boolean {
    const parsedDate = new Date(value);
    return !isNaN(parsedDate.getTime());
  }

  getData<T>(endpoint: string, params: object|null = null): Observable<T> {
    const apiHost = environment.apiHost;

    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer '+this.sessionService.getToken())

    let p = new HttpParams();
    if (params !== null) {
      for (const [key, val] of Object.entries(params)) {
        p = p.set(key, val)
      }
    }

    type FieldTypes<T> = {
      [K in keyof T]: T[K];
    };

    return this.http.get<ApiResponse>(apiHost+endpoint, {params: p, headers: h})
      .pipe(switchMap((resp: ApiResponse) => {
        const data = resp["data"];

            for (const key in data) {
              const value = data[key];
                if (typeof value === 'string' && APIService.isValidDate(value)) {
                  data[key] = new Date(value);
                }
            }

      return of(data as T);
      }),
        catchError((error) => {
          // Handle error if any request fails
          console.error(error);
          switch(error.status) {
            case 401:
              this.router.navigateByUrl('/login');
              return of(null as T);
            default:
              return of(null as T);
          }
        })
      )
  }

  postData<T>(endpoint: string, body: object): Observable<T> {
    const apiHost = environment.apiHost;

    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer '+this.sessionService.getToken())

    return this.http.post<ApiResponse>(apiHost+endpoint, body, {headers: h})
        .pipe(switchMap((resp: ApiResponse) => {
              const data = resp["data"];

              for (const key in data) {
                const value = data[key];
                if (typeof value === 'string' && APIService.isValidDate(value)) {
                  data[key] = new Date(value);
                }
              }

              return of(data as T);
            }),
            catchError((error) => {
              // Handle error if any request fails
              console.error(error);
              switch(error.status) {
                case 401:
                  this.router.navigateByUrl('/login');
                  return of(0 as T);
                default:
                  return of(0 as T);
              }
            })
        )
  }

  autocomplete(entity: string, term: string): Observable<SimpleEntity[]> {
    return this.getData<SimpleEntity[]>('autocomplete/'+entity+'/'+term)
  }
}
