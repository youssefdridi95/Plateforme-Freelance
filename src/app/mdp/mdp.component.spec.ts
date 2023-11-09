import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpComponent } from './mdp.component';

describe('MdpComponent', () => {
  let component: MdpComponent;
  let fixture: ComponentFixture<MdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdpComponent]
    });
    fixture = TestBed.createComponent(MdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
