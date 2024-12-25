import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiResponse} from '../../entities/ApiResponse';
import {SessionService} from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) {
  }

  getData<T>(endpoint: string, params: object|null = null): Observable<T> {
    const apiHost = environment.apiHost;

    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer '+this.sessionService.getToken())
    console.log(h)

    let p = new HttpParams();
    if (params !== null) {
      for (const [key, val] of Object.entries(params)) {
        p = p.set(key, val)
      }
    }

    const response = this.http.get<ApiResponse>(apiHost+endpoint, {params: p, headers: h})
    return response.pipe(map((resp) => resp.data as T))
  }
}
