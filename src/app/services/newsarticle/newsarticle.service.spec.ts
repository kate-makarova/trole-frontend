import { TestBed } from '@angular/core/testing';

import { NewsArticleService } from './newsarticle.service';

describe('NewsArticleService', () => {
  let service: NewsArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
