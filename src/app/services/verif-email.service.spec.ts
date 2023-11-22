import { TestBed } from '@angular/core/testing';

import { VerifEmailService } from './verif-email.service';

describe('VerifEmailService', () => {
  let service: VerifEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
