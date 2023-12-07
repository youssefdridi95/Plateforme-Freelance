import { TestBed } from '@angular/core/testing';

import { NotificationMessageListService } from './notification-message-list.service';

describe('NotificationMessageListService', () => {
  let service: NotificationMessageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationMessageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
