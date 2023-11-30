import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseupdateComponent } from './entrepriseupdate.component';

describe('EntrepriseupdateComponent', () => {
  let component: EntrepriseupdateComponent;
  let fixture: ComponentFixture<EntrepriseupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrepriseupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
