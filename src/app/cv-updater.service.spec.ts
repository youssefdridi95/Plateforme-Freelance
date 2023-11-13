import { TestBed } from '@angular/core/testing';

import { CvUpdaterService } from './cv-updater.service';

describe('CvUpdaterserviceService', () => {
  let service: CvUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
