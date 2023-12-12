import { TestBed } from '@angular/core/testing';

import { ShareddService } from './sharedd.service';

describe('ShareddService', () => {
  let service: ShareddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
