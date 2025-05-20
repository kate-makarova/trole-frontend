import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, delay, Observable, of, retry, retryWhen, Subscription, switchMap, throwError, timer } from 'rxjs';
import { concatMap, mergeMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../entities/ApiResponse';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SessionService } from '../session/session.service';
import { SimpleEntity } from '../../entities/SimpleEntity';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  httpStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Configuration for retry logic
  private readonly maxRetries = 3;
  private readonly initialRetryDelay = 1000; // 1 second

  constructor(private http: HttpClient,
              protected sessionService: SessionService,
              private router: Router,
              private errorHandlingService: ErrorHandlingService) {
  }

  /**
   * Creates a retry strategy with exponential backoff for network operations
   * @param maxRetries Maximum number of retry attempts
   * @param initialDelay Initial delay in milliseconds
   * @returns An operator that implements the retry strategy
   */
  private createRetryStrategy(maxRetries: number = this.maxRetries, initialDelay: number = this.initialRetryDelay) {
    return retryWhen<any>(errors => 
      errors.pipe(
        mergeMap((error, index) => {
          // Only retry for network errors or server errors (5xx)
          const isNetworkError = error.status === 0;
          const isServerError = error.status >= 500 && error.status < 600;

          if (index >= maxRetries || (!isNetworkError && !isServerError)) {
            return throwError(() => error);
          }

          // Calculate exponential backoff delay
          const retryAttempt = index + 1;
          const delay = initialDelay * Math.pow(2, retryAttempt);

          console.log(`Retry attempt ${retryAttempt} for ${error.url} after ${delay}ms`);

          return timer(delay);
        })
      )
    );
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

    return this.http.get<ApiResponse<T>>(apiHost+endpoint, {params: p, headers: h})
      .pipe(
        // Apply retry strategy for network operations
        this.createRetryStrategy(),
        switchMap((resp: ApiResponse<T>) => {
          const data = resp.data;
          this.httpStatus.next(resp.code);

          if (data && typeof data === 'object') {
            for (const key in data) {
              const value = data[key];
              if (typeof value === 'string' && APIService.isValidDate(value)) {
                (data as any)[key] = new Date(value);
              }
            }
          }

          return of(data);
        }),
        catchError((error) => {
          // Handle error if any request fails
          if (error instanceof HttpErrorResponse) {
            this.httpStatus.next(error.status);
          }

          // Use the enhanced error handling service
          return this.errorHandlingService.handleObservableError<T>(`fetching data from ${endpoint}`, null as unknown as T)(error);
        })
      )
  }

  postData<T>(endpoint: string, body: object): Observable<T> {
    const apiHost = environment.apiHost;

    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer '+this.sessionService.getToken())

    return this.http.post<ApiResponse<T>>(apiHost+endpoint, body, {headers: h})
        .pipe(
            // Apply retry strategy for network operations
            this.createRetryStrategy(),
            switchMap((resp: ApiResponse<T>) => {
              const data = resp.data;

              if (data && typeof data === 'object') {
                for (const key in data) {
                  const value = data[key];
                  if (typeof value === 'string' && APIService.isValidDate(value)) {
                    (data as any)[key] = new Date(value);
                  }
                }
              }

              return of(data);
            }),
            catchError((error) => {
              // Handle error if any request fails
              if (error instanceof HttpErrorResponse) {
                this.httpStatus.next(error.status);
              }

              // Use the enhanced error handling service
              return this.errorHandlingService.handleObservableError<T>(`posting data to ${endpoint}`, null as unknown as T)(error);
            })
        )
  }

  autocomplete(entity: string, term: string): Observable<SimpleEntity[]> {
    return this.getData<SimpleEntity[]>('autocomplete/'+entity+'/'+term)
  }

  /**
   * Performs a fire-and-forget POST request (no handling of the response)
   * @param endpoint The API endpoint to call
   * @param body The request body
   * @returns A subscription that can be used to unsubscribe if needed
   */
  postDataFireAndForget(endpoint: string, body: object): Subscription {
    return this.postData(endpoint, body).subscribe(() => {});
  }

  /**
   * Updates a BehaviorSubject with the result of a GET request
   * @param endpoint The API endpoint to call
   * @param subject The BehaviorSubject to update with the response data
   * @param params Optional query parameters
   * @returns A subscription that can be used to unsubscribe if needed
   */
  getDataAndUpdateSubject<T>(endpoint: string, subject: BehaviorSubject<T | null>, params: object | null = null): Subscription {
    return this.getData<T>(endpoint, params).subscribe((data: T) => {
      subject.next(data);
    });
  }

  /**
   * Updates a BehaviorSubject with the result of a POST request
   * @param endpoint The API endpoint to call
   * @param body The request body
   * @param subject The BehaviorSubject to update with the response data
   * @returns A subscription that can be used to unsubscribe if needed
   */
  postDataAndUpdateSubject<T>(endpoint: string, body: object, subject: BehaviorSubject<T | null>): Subscription {
    return this.postData<T>(endpoint, body).subscribe((data: T) => {
      subject.next(data);
    });
  }
}
