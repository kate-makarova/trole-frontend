import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError, of } from 'rxjs';

export interface ErrorMessage {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  statusCode?: number;
  details?: string;
  recoveryActions?: ErrorRecoveryAction[];
}

export interface ErrorRecoveryAction {
  label: string;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService implements ErrorHandler {
  private errorSubject = new BehaviorSubject<ErrorMessage | null>(null);
  public error$ = this.errorSubject.asObservable();

  // Track whether we're currently showing an error to prevent duplicates
  private isShowingError = false;

  constructor(
    private ngZone: NgZone,
    private router: Router
  ) { }

  /**
   * Global error handler implementation required by ErrorHandler interface
   * Handles all uncaught errors in the application
   * @param error The error object
   */
  handleError(error: any): void {
    this.ngZone.run(() => {
      console.error('Global error handler caught an error:', error);

      let errorMessage: ErrorMessage;

      if (error instanceof HttpErrorResponse) {
        // For HTTP errors, use the existing HTTP error handler
        this.handleHttpError(error);
      } else {
        // For other errors (runtime errors, etc.)
        const message = error.message || 'An unexpected error occurred';
        const stack = error.stack || '';

        errorMessage = {
          message,
          type: 'error',
          timestamp: new Date(),
          details: stack,
          recoveryActions: [
            {
              label: 'Reload Page',
              action: () => window.location.reload()
            }
          ]
        };

        this.publishError(errorMessage);
      }
    });
  }

  /**
   * Handles an HTTP error response and returns a user-friendly error message
   * @param error The HTTP error response
   * @param context Optional context information to include in the error message
   * @returns A user-friendly error message
   */
  handleHttpError(error: HttpErrorResponse, context?: string): string {
    let message = 'An error occurred';
    let recoveryActions: ErrorRecoveryAction[] = [];

    // Log the error for debugging
    console.error('API Error:', error);

    if (context) {
      message += ` while ${context}`;
    }

    // Create a detailed error message based on the status code
    switch (error.status) {
      case 0:
        message = 'Cannot connect to the server. Please check your internet connection.';
        recoveryActions = [
          {
            label: 'Retry',
            action: () => window.location.reload()
          },
          {
            label: 'Go to Home',
            action: () => this.ngZone.run(() => this.router.navigate(['/']))
          }
        ];
        break;
      case 400:
        message = 'Invalid request. Please check your input.';
        recoveryActions = [
          {
            label: 'Go Back',
            action: () => this.ngZone.run(() => window.history.back())
          }
        ];
        break;
      case 401:
        message = 'You need to log in to access this resource.';
        recoveryActions = [
          {
            label: 'Log In',
            action: () => this.ngZone.run(() => this.router.navigate(['/login']))
          }
        ];
        break;
      case 403:
        message = 'You do not have permission to access this resource.';
        recoveryActions = [
          {
            label: 'Go to Home',
            action: () => this.ngZone.run(() => this.router.navigate(['/']))
          }
        ];
        break;
      case 404:
        message = 'The requested resource was not found.';
        recoveryActions = [
          {
            label: 'Go Back',
            action: () => this.ngZone.run(() => window.history.back())
          },
          {
            label: 'Go to Home',
            action: () => this.ngZone.run(() => this.router.navigate(['/']))
          }
        ];
        break;
      case 500:
        message = 'Server error. Please try again later.';
        recoveryActions = [
          {
            label: 'Retry',
            action: () => window.location.reload()
          },
          {
            label: 'Go to Home',
            action: () => this.ngZone.run(() => this.router.navigate(['/']))
          }
        ];
        break;
      default:
        message = `Error ${error.status}: ${error.statusText || 'Unknown error'}`;
        recoveryActions = [
          {
            label: 'Retry',
            action: () => window.location.reload()
          },
          {
            label: 'Go to Home',
            action: () => this.ngZone.run(() => this.router.navigate(['/']))
          }
        ];
    }

    // Add more details if available
    if (error.error && error.error.message) {
      message += ` (${error.error.message})`;
    }

    // Prevent showing duplicate errors
    if (!this.isShowingError) {
      this.isShowingError = true;

      // Publish the error to subscribers
      this.publishError({
        message,
        type: 'error',
        timestamp: new Date(),
        statusCode: error.status,
        details: error.message,
        recoveryActions
      });
    }

    return message;
  }

  /**
   * Publishes an error message to subscribers
   * @param error The error message to publish
   */
  publishError(error: ErrorMessage): void {
    this.errorSubject.next(error);
  }

  /**
   * Clears the current error message
   */
  clearError(): void {
    this.errorSubject.next(null);
    this.isShowingError = false;
  }

  /**
   * Gets the current error message
   * @returns An observable of the current error message
   */
  getError(): Observable<ErrorMessage | null> {
    return this.error$;
  }

  /**
   * Creates a consistent error handling pattern for observables
   * @param operation Description of the operation that failed
   * @param result Optional default value to return in case of error
   * @returns An operator function that handles errors
   */
  handleObservableError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      // For HTTP errors, use the HTTP error handler
      if (error instanceof HttpErrorResponse) {
        this.handleHttpError(error, operation);
      } else {
        // For other errors, create a generic error message
        const message = `Operation ${operation} failed: ${error.message || 'Unknown error'}`;
        console.error(message, error);

        this.publishError({
          message,
          type: 'error',
          timestamp: new Date(),
          details: error.stack || '',
          recoveryActions: [
            {
              label: 'Retry',
              action: () => window.location.reload()
            }
          ]
        });
      }

      // Return a default result if provided, otherwise rethrow the error
      return result !== undefined ? of(result) : throwError(() => error);
    };
  }
}
