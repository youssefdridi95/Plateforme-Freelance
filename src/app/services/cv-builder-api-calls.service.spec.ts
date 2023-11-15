import { TestBed } from '@angular/core/testing';

import { CvBuilderApiCallsService } from './cv-builder-api-calls.service';

describe('CvBuilderApiCallsService', () => {
  let service: CvBuilderApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvBuilderApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
