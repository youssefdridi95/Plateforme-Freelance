import { TestBed } from '@angular/core/testing';

import { MotdepasseService } from './motdepasse.service';

describe('MotdepasseService', () => {
  let service: MotdepasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotdepasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
