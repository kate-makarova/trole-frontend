import { TestBed } from '@angular/core/testing';

import { SingleSocketChatService } from './single-socket-chat.service';

describe('SingleSocketChatService', () => {
  let service: SingleSocketChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleSocketChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
