import { TestBed } from '@angular/core/testing';

import { CvBuiderService } from './cv-buider.service';

describe('CvBuiderService', () => {
  let service: CvBuiderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvBuiderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
