import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDenied403Component } from './access-denied403.component';

describe('AccessDenied403Component', () => {
  let component: AccessDenied403Component;
  let fixture: ComponentFixture<AccessDenied403Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessDenied403Component]
    });
    fixture = TestBed.createComponent(AccessDenied403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
