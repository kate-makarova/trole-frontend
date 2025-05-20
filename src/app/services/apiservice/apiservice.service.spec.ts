import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { APIService } from './apiservice.service';
import { SessionService } from '../session/session.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../entities/ApiResponse';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;
  let sessionServiceMock: jasmine.SpyObj<SessionService>;
  let routerMock: jasmine.SpyObj<Router>;
  let errorHandlingServiceMock: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    sessionServiceMock = jasmine.createSpyObj('SessionService', ['getToken']);
    sessionServiceMock.getToken.and.returnValue('test-token');

    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    errorHandlingServiceMock = jasmine.createSpyObj('ErrorHandlingService', ['handleHttpError']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        APIService,
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceMock }
      ]
    });

    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData', () => {
    it('should make a GET request with the correct URL and headers', () => {
      const testData = { id: 1, name: 'Test' };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };

      service.getData('test-endpoint').subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(apiResponse);
    });

    it('should handle query parameters correctly', () => {
      const testData = { id: 1, name: 'Test' };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };
      const params = { param1: 'value1', param2: 'value2' };

      service.getData('test-endpoint', params).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(request => {
        return request.url === `${environment.apiHost}test-endpoint` &&
               request.params.get('param1') === 'value1' &&
               request.params.get('param2') === 'value2';
      });
      expect(req.request.method).toBe('GET');
      req.flush(apiResponse);
    });

    it('should convert date strings in the response to Date objects', () => {
      const dateStr = '2023-05-20T12:00:00Z';
      const testData = { id: 1, date: dateStr };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };

      service.getData('test-endpoint').subscribe(data => {
        expect(data.id).toBe(1);
        expect(data.date instanceof Date).toBe(true);
        expect(data.date.toISOString()).toBe(dateStr);
      });

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush(apiResponse);
    });

    it('should handle errors and call error handling service', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Server Error'
      });

      service.getData('test-endpoint').subscribe(
        () => fail('should have failed with the 500 error'),
        (error) => {
          // This should not be called since we're returning null instead of throwing
          fail('should not throw error');
        }
      );

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush('test error', errorResponse);

      expect(errorHandlingServiceMock.handleHttpError).toHaveBeenCalledWith(
        jasmine.any(HttpErrorResponse),
        'fetching data from test-endpoint'
      );
    });

    it('should redirect to login page on 401 error', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized'
      });

      service.getData('test-endpoint').subscribe();

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush('Unauthorized', errorResponse);

      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

  describe('postData', () => {
    it('should make a POST request with the correct URL, body, and headers', () => {
      const testBody = { name: 'Test' };
      const testData = { id: 1, name: 'Test' };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };

      service.postData('test-endpoint', testBody).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(testBody);
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(apiResponse);
    });

    it('should convert date strings in the response to Date objects', () => {
      const dateStr = '2023-05-20T12:00:00Z';
      const testBody = { name: 'Test' };
      const testData = { id: 1, date: dateStr };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };

      service.postData('test-endpoint', testBody).subscribe(data => {
        expect(data.id).toBe(1);
        expect(data.date instanceof Date).toBe(true);
        expect(data.date.toISOString()).toBe(dateStr);
      });

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush(apiResponse);
    });

    it('should handle errors and call error handling service', () => {
      const testBody = { name: 'Test' };
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Server Error'
      });

      service.postData('test-endpoint', testBody).subscribe(
        () => fail('should have failed with the 500 error'),
        (error) => {
          // This should not be called since we're returning null instead of throwing
          fail('should not throw error');
        }
      );

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush('test error', errorResponse);

      expect(errorHandlingServiceMock.handleHttpError).toHaveBeenCalledWith(
        jasmine.any(HttpErrorResponse),
        'posting data to test-endpoint'
      );
    });

    it('should redirect to login page on 401 error', () => {
      const testBody = { name: 'Test' };
      const errorResponse = new HttpErrorResponse({
        error: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized'
      });

      service.postData('test-endpoint', testBody).subscribe();

      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush('Unauthorized', errorResponse);

      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

  describe('retry logic', () => {
    it('should retry network errors', () => {
      const testData = { id: 1, name: 'Test' };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };

      // Spy on console.log to verify retry messages
      spyOn(console, 'log');

      service.getData('test-endpoint').subscribe(data => {
        expect(data).toEqual(testData);
      });

      // First request fails with network error
      const req1 = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req1.error(new ErrorEvent('Network error'), { status: 0 });

      // Second request fails with network error
      const req2 = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req2.error(new ErrorEvent('Network error'), { status: 0 });

      // Third request succeeds
      const req3 = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req3.flush(apiResponse);

      // Verify retry messages were logged
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Retry attempt 1.+after 2000ms/));
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Retry attempt 2.+after 4000ms/));
    });

    it('should retry server errors (5xx)', () => {
      const testData = { id: 1, name: 'Test' };
      const apiResponse: ApiResponse<any> = { code: 200, data: testData };

      // Spy on console.log to verify retry messages
      spyOn(console, 'log');

      service.getData('test-endpoint').subscribe(data => {
        expect(data).toEqual(testData);
      });

      // First request fails with 500 error
      const req1 = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req1.flush('Server error', { status: 500, statusText: 'Server Error' });

      // Second request succeeds
      const req2 = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req2.flush(apiResponse);

      // Verify retry message was logged
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Retry attempt 1.+after 2000ms/));
    });

    it('should not retry client errors (4xx)', () => {
      // Spy on console.log to verify no retry messages
      spyOn(console, 'log');

      service.getData('test-endpoint').subscribe();

      // Request fails with 404 error
      const req = httpMock.expectOne(`${environment.apiHost}test-endpoint`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });

      // Verify no retry messages were logged
      expect(console.log).not.toHaveBeenCalled();

      // Verify no additional requests were made
      httpMock.expectNone(`${environment.apiHost}test-endpoint`);
    });
  });

  describe('helper methods', () => {
    it('autocomplete should call getData with correct endpoint', () => {
      spyOn(service, 'getData').and.returnValue(of([]));

      service.autocomplete('User', 'john');

      expect(service.getData).toHaveBeenCalledWith('autocomplete/User/john');
    });

    it('postDataFireAndForget should call postData and subscribe', () => {
      const testBody = { name: 'Test' };
      spyOn(service, 'postData').and.returnValue(of({ id: 1 }));

      service.postDataFireAndForget('test-endpoint', testBody);

      expect(service.postData).toHaveBeenCalledWith('test-endpoint', testBody);
    });

    it('getDataAndUpdateSubject should call getData and update subject', () => {
      const testData = { id: 1 };
      const subject = jasmine.createSpyObj('BehaviorSubject', ['next']);
      spyOn(service, 'getData').and.returnValue(of(testData));

      service.getDataAndUpdateSubject('test-endpoint', subject);

      expect(service.getData).toHaveBeenCalledWith('test-endpoint', null);
      expect(subject.next).toHaveBeenCalledWith(testData);
    });

    it('postDataAndUpdateSubject should call postData and update subject', () => {
      const testBody = { name: 'Test' };
      const testData = { id: 1 };
      const subject = jasmine.createSpyObj('BehaviorSubject', ['next']);
      spyOn(service, 'postData').and.returnValue(of(testData));

      service.postDataAndUpdateSubject('test-endpoint', testBody, subject);

      expect(service.postData).toHaveBeenCalledWith('test-endpoint', testBody);
      expect(subject.next).toHaveBeenCalledWith(testData);
    });
  });
});
