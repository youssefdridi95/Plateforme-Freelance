import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEntrepriseComponent } from './signup-entreprise.component';

describe('SignupEntrepriseComponent', () => {
  let component: SignupEntrepriseComponent;
  let fixture: ComponentFixture<SignupEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupEntrepriseComponent]
    });
    fixture = TestBed.createComponent(SignupEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
