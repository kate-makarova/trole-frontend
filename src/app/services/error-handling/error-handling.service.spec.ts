import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlingService, ErrorMessage } from './error-handling.service';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlingService]
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleHttpError', () => {
    it('should return a user-friendly error message for network error', () => {
      const error = new HttpErrorResponse({
        error: 'Network Error',
        status: 0,
        statusText: 'Unknown Error'
      });

      const message = service.handleHttpError(error);
      expect(message).toContain('Cannot connect to the server');
    });

    it('should return a user-friendly error message for 400 error', () => {
      const error = new HttpErrorResponse({
        error: { message: 'Invalid data' },
        status: 400,
        statusText: 'Bad Request'
      });

      const message = service.handleHttpError(error);
      expect(message).toContain('Invalid request');
      expect(message).toContain('Invalid data');
    });

    it('should return a user-friendly error message for 401 error', () => {
      const error = new HttpErrorResponse({
        error: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized'
      });

      const message = service.handleHttpError(error);
      expect(message).toContain('You need to log in');
    });

    it('should return a user-friendly error message for 403 error', () => {
      const error = new HttpErrorResponse({
        error: 'Forbidden',
        status: 403,
        statusText: 'Forbidden'
      });

      const message = service.handleHttpError(error);
      expect(message).toContain('You do not have permission');
    });

    it('should return a user-friendly error message for 404 error', () => {
      const error = new HttpErrorResponse({
        error: 'Not Found',
        status: 404,
        statusText: 'Not Found'
      });

      const message = service.handleHttpError(error);
      expect(message).toContain('resource was not found');
    });

    it('should return a user-friendly error message for 500 error', () => {
      const error = new HttpErrorResponse({
        error: 'Server Error',
        status: 500,
        statusText: 'Internal Server Error'
      });

      const message = service.handleHttpError(error);
      expect(message).toContain('Server error');
    });

    it('should include context in the error message if provided', () => {
      const error = new HttpErrorResponse({
        error: 'Error',
        status: 500,
        statusText: 'Internal Server Error'
      });

      const message = service.handleHttpError(error, 'fetching user data');
      expect(message).toContain('Server error');
      expect(message).toContain('fetching user data');
    });
  });

  describe('publishError and getError', () => {
    it('should publish an error message and make it available via getError', (done) => {
      const errorMessage: ErrorMessage = {
        message: 'Test error',
        type: 'error',
        timestamp: new Date(),
        statusCode: 500,
        details: 'Test details'
      };

      service.publishError(errorMessage);

      service.getError().subscribe(error => {
        expect(error).toEqual(errorMessage);
        done();
      });
    });
  });

  describe('clearError', () => {
    it('should clear the current error message', (done) => {
      const errorMessage: ErrorMessage = {
        message: 'Test error',
        type: 'error',
        timestamp: new Date(),
        statusCode: 500,
        details: 'Test details'
      };

      service.publishError(errorMessage);
      service.clearError();

      service.getError().subscribe(error => {
        expect(error).toBeNull();
        done();
      });
    });
  });
});