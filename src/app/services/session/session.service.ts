import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../entities/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, from, interval, map, Observable, of, Subject, Subscription, switchMap, takeUntil, tap, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SimpleUser } from "../../entities/SimpleUser";
import { Router } from "@angular/router";
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnDestroy {
  private user: User|null = null;
  private accessToken: string = '';
  private refreshToken: string = '';
  private tokenExpiration: Date | null = null;

  // Session state observables
  public initialized: Subject<boolean> = new Subject<boolean>();
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public sessionExpiring$ = new BehaviorSubject<boolean>(false);

  // Configuration
  private readonly tokenRefreshThreshold = 60; // Refresh token 60 seconds before expiration
  private readonly sessionTimeoutMinutes = 30; // Log out after 30 minutes of inactivity
  private readonly sessionWarningMinutes = 1; // Warn 1 minute before session timeout

  // Subscriptions
  private refreshSubscription: Subscription | null = null;
  private activitySubscription: Subscription | null = null;
  private sessionTimeoutSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();

  // Track user activity
  private lastActivity: Date = new Date();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {
    // Set up activity tracking
    this.setupActivityTracking();
  }

  /**
   * Sets up activity tracking to monitor user interactions
   */
  private setupActivityTracking(): void {
    // Track user activity events
    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];

    activityEvents.forEach(eventName => {
      window.addEventListener(eventName, () => this.updateActivity());
    });

    // Check for session timeout every minute
    this.activitySubscription = interval(60000) // Check every minute
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkSessionTimeout());
  }

  /**
   * Updates the last activity timestamp
   */
  private updateActivity(): void {
    this.lastActivity = new Date();

    // If session was about to expire, reset the warning
    if (this.sessionExpiring$.value) {
      this.sessionExpiring$.next(false);

      // Reset the session timeout check
      this.setupSessionTimeoutCheck();
    }
  }

  /**
   * Checks if the session has timed out due to inactivity
   */
  private checkSessionTimeout(): void {
    if (!this.isAuthenticated$.value) return;

    const now = new Date();
    const inactiveTime = (now.getTime() - this.lastActivity.getTime()) / (1000 * 60); // in minutes

    if (inactiveTime >= this.sessionTimeoutMinutes) {
      // Session has timed out, log the user out
      this.logout();
      this.errorHandlingService.publishError({
        message: 'Your session has expired due to inactivity.',
        type: 'info',
        timestamp: new Date()
      });
    } else if (inactiveTime >= (this.sessionTimeoutMinutes - this.sessionWarningMinutes) && !this.sessionExpiring$.value) {
      // Session is about to expire, warn the user
      this.sessionExpiring$.next(true);
    }
  }

  /**
   * Sets up the session timeout check
   */
  private setupSessionTimeoutCheck(): void {
    if (this.sessionTimeoutSubscription) {
      this.sessionTimeoutSubscription.unsubscribe();
    }

    const timeoutAt = new Date(this.lastActivity.getTime() + this.sessionTimeoutMinutes * 60000);
    const warningAt = new Date(timeoutAt.getTime() - this.sessionWarningMinutes * 60000);
    const now = new Date();

    // Schedule warning
    if (now < warningAt) {
      const warningDelay = warningAt.getTime() - now.getTime();
      this.sessionTimeoutSubscription = timer(warningDelay)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.sessionExpiring$.next(true);
        });
    }
  }

  /**
   * Initializes the session service
   */
  async init() {
    const session = localStorage.getItem('session');

    if (session) {
      try {
        const data = JSON.parse(session);
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.tokenExpiration = data.tokenExpiration ? new Date(data.tokenExpiration) : null;

        // Check if token is expired
        if (this.tokenExpiration && new Date() >= this.tokenExpiration) {
          // Token is expired, try to refresh
          const status = await this.refresh();
          if (status) {
            this.user = data.user;
            this.isAuthenticated$.next(true);
            this.initialized.next(true);
            this.setupTokenRefresh();
            this.setupSessionTimeoutCheck();
          } else {
            // Refresh failed, clear session
            this.logout();
          }
        } else {
          // Token is still valid
          this.user = data.user;
          this.isAuthenticated$.next(true);
          this.initialized.next(true);
          this.setupTokenRefresh();
          this.setupSessionTimeoutCheck();
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        this.logout();
      }
    } else {
      this.initialized.next(true);
    }
  }

  /**
   * Sets up automatic token refresh before expiration
   */
  private setupTokenRefresh(): void {
    // Cancel any existing refresh subscription
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }

    // If no token expiration or not authenticated, don't set up refresh
    if (!this.tokenExpiration || !this.isAuthenticated$.value) {
      return;
    }

    const now = new Date();
    const expiresIn = this.tokenExpiration.getTime() - now.getTime();

    // If token is already expired or will expire in less than threshold, refresh now
    if (expiresIn <= this.tokenRefreshThreshold * 1000) {
      this.refresh().then(success => {
        if (!success) {
          this.logout();
        }
      });
      return;
    }

    // Schedule refresh before token expires
    const refreshDelay = expiresIn - (this.tokenRefreshThreshold * 1000);
    this.refreshSubscription = timer(refreshDelay)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return from(this.refresh());
        })
      )
      .subscribe(success => {
        if (!success) {
          this.logout();
        }
      });
  }

  /**
   * Updates the session with new user and token information
   * @param user The user object
   * @param accessToken The access token
   * @param refreshToken The refresh token
   * @param expiresIn Optional token expiration time in seconds
   */
  updateSession(
      user: User,
      accessToken: string,
      refreshToken: string,
      expiresIn?: number) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    // Calculate token expiration if expiresIn is provided
    if (expiresIn) {
      this.tokenExpiration = new Date(new Date().getTime() + expiresIn * 1000);
    }

    this.isAuthenticated$.next(true);
    this.initialized.next(true);

    // Store session in localStorage
    localStorage.setItem("session", JSON.stringify({
      "user": this.user,
      "accessToken": this.accessToken,
      "refreshToken": this.refreshToken,
      "tokenExpiration": this.tokenExpiration
    }));

    // Set up automatic token refresh
    this.setupTokenRefresh();

    // Reset activity tracking
    this.updateActivity();
  }

  getUser(): User|null {
    return this.user;
  }

  getSimpleUser(): SimpleUser|null {
     if (this.user === null) {return null}
     return new SimpleUser(this.user.id, this.user.username, this.user.avatar)
  }

  updateUser(patch: Partial<User>): boolean {
     if(this.user === null) {
       return false;
     }
    for (const property in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, property) && property in this.user) {
        (this.user as any)[property] = patch[property];
      }
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

  /**
   * Gets an authentication token from the API
   * @param login The username
   * @param password The password
   * @returns An observable with the token response
   */
  private getAPIToken(login: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiHost+'token', {
      username: login, password: password
    }).pipe(
      catchError(error => {
        this.errorHandlingService.handleHttpError(error, 'authenticating');
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets a new access token using the refresh token
   * @returns An observable with the refresh token response
   */
  private getAPIRefreshToken(): Observable<any> {
    return this.http.post<any>(environment.apiHost+'token/refresh', {
      refresh: this.refreshToken
    }).pipe(
      catchError(error => {
        this.errorHandlingService.handleHttpError(error, 'refreshing authentication token');
        return throwError(() => error);
      })
    );
  }

  /**
   * Refreshes the access token using the refresh token
   * @returns A promise that resolves to true if refresh was successful, false otherwise
   */
  async refresh(): Promise<boolean> {
    if (!this.refreshToken) {
      console.error('No refresh token available');
      localStorage.removeItem('session');
      this.isAuthenticated$.next(false);
      return false;
    }

    try {
      const response = await this.getAPIRefreshToken().toPromise();

      if (!response || !response.access) {
        console.error('Invalid refresh token response', response);
        return false;
      }

      // Update the access token
      this.accessToken = response.access;

      // Update token expiration if provided in the response
      if (response.expires_in) {
        this.tokenExpiration = new Date(new Date().getTime() + response.expires_in * 1000);
      } else {
        // Default to 1 hour expiration if not provided
        this.tokenExpiration = new Date(new Date().getTime() + 3600 * 1000);
      }

      // Update localStorage
      localStorage.setItem("session", JSON.stringify({
        "user": this.user,
        "accessToken": this.accessToken,
        "refreshToken": this.refreshToken,
        "tokenExpiration": this.tokenExpiration
      }));

      // Set up the next token refresh
      this.setupTokenRefresh();

      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);

      // If refresh fails with a 401, the refresh token is invalid
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.logout();
        this.errorHandlingService.publishError({
          message: 'Your session has expired. Please log in again.',
          type: 'info',
          timestamp: new Date(),
          recoveryActions: [
            {
              label: 'Log In',
              action: () => this.router.navigate(['/login'])
            }
          ]
        });
      }

      return false;
    }
  }

  /**
   * Logs in a user with the given credentials
   * @param login The username
   * @param password The password
   * @returns An observable that resolves to true if login was successful, false otherwise
   */
  login(login: string, password: string): Observable<boolean> {
    return this.getAPIToken(login, password).pipe(
      switchMap((response) => {
        if (!response || !response.access) {
          console.error('Invalid login response', response);
          return of(false);
        }

        // Store tokens
        this.accessToken = response.access;
        this.refreshToken = response.refresh;

        // Calculate token expiration if provided
        if (response.expires_in) {
          this.tokenExpiration = new Date(new Date().getTime() + response.expires_in * 1000);
        } else {
          // Default to 1 hour expiration if not provided
          this.tokenExpiration = new Date(new Date().getTime() + 3600 * 1000);
        }

        // Get user details
        return this.getUserByUserName(login).pipe(
          switchMap((secondResponse) => {
            if (!secondResponse || !secondResponse.data) {
              console.error('Invalid user response', secondResponse);
              return of(false);
            }

            // Store user data
            this.user = secondResponse.data;

            // Update session state
            this.isAuthenticated$.next(true);
            this.updateActivity();

            // Store session in localStorage
            localStorage.setItem("session", JSON.stringify({
              "user": this.user,
              "accessToken": this.accessToken,
              "refreshToken": this.refreshToken,
              "tokenExpiration": this.tokenExpiration
            }));

            // Set up token refresh and session timeout
            this.setupTokenRefresh();
            this.setupSessionTimeoutCheck();

            return of(true);
          }),
          catchError(error => {
            this.errorHandlingService.handleHttpError(error, 'retrieving user information');
            return of(false);
          })
        );
      }),
      catchError(error => {
        // Use the error handling service
        this.errorHandlingService.handleHttpError(error, 'logging in');
        return of(false);
      })
    )
  }

  /**
   * Logs out the current user and cleans up the session
   */
  logout() {
    // Clear session data
    localStorage.removeItem('session');
    this.user = null;
    this.refreshToken = '';
    this.accessToken = '';
    this.tokenExpiration = null;

    // Update authentication state
    this.isAuthenticated$.next(false);

    // Clean up subscriptions
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }

    if (this.sessionTimeoutSubscription) {
      this.sessionTimeoutSubscription.unsubscribe();
      this.sessionTimeoutSubscription = null;
    }

    // Navigate to home page
    this.router.navigateByUrl('/');
  }

  /**
   * Cleans up resources when the service is destroyed
   */
  ngOnDestroy() {
    // Complete all subjects
    this.destroy$.next();
    this.destroy$.complete();
    this.initialized.complete();
    this.isAuthenticated$.complete();
    this.sessionExpiring$.complete();

    // Unsubscribe from all subscriptions
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }

    if (this.sessionTimeoutSubscription) {
      this.sessionTimeoutSubscription.unsubscribe();
    }
  }
}
