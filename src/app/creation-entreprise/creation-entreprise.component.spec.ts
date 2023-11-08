import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEntrepriseComponent } from './creation-entreprise.component';

describe('CreationEntrepriseComponent', () => {
  let component: CreationEntrepriseComponent;
  let fixture: ComponentFixture<CreationEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationEntrepriseComponent]
    });
    fixture = TestBed.createComponent(CreationEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
