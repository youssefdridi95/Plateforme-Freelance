import { TestBed } from '@angular/core/testing';

import { WidthCheckService } from './width-check.service';

describe('WidthCheckService', () => {
  let service: WidthCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidthCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
