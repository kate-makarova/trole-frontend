import { TestBed } from '@angular/core/testing';

import { NewsarticleService } from './newsarticle.service';

describe('NewsarticleService', () => {
  let service: NewsarticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsarticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
