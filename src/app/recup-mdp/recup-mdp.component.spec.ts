import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupMDPComponent } from './recup-mdp.component';

describe('RecupMDPComponent', () => {
  let component: RecupMDPComponent;
  let fixture: ComponentFixture<RecupMDPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecupMDPComponent]
    });
    fixture = TestBed.createComponent(RecupMDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
