import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInscritComponent } from './user-inscrit.component';

describe('UserInscritComponent', () => {
  let component: UserInscritComponent;
  let fixture: ComponentFixture<UserInscritComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInscritComponent]
    });
    fixture = TestBed.createComponent(UserInscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
