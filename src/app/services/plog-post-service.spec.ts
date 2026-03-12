import { TestBed } from '@angular/core/testing';

import { PlogPostService } from './plog-post-service';

describe('PlogPostService', () => {
  let service: PlogPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlogPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
