import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiResponse} from '../../entities/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {
  }

  getData<T>(endpoint: string, params: object|null = null): Observable<T> {
    const apiHost = environment.apiHost;

    let p = new HttpParams();
    if (params !== null) {
      for (const [key, val] of Object.entries(params)) {
        p.set(key, val)
      }
    }

    const response = this.http.get<ApiResponse>(apiHost+endpoint, {params: p})
    return response.pipe(map((resp) => resp.data as T))
  }
}
