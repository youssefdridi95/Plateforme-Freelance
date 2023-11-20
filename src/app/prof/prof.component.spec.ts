import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfComponent } from './prof.component';

describe('ProfComponent', () => {
  let component: ProfComponent;
  let fixture: ComponentFixture<ProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfComponent]
    });
    fixture = TestBed.createComponent(ProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
