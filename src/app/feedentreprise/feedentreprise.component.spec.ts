import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedentrepriseComponent } from './feedentreprise.component';

describe('FeedentrepriseComponent', () => {
  let component: FeedentrepriseComponent;
  let fixture: ComponentFixture<FeedentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedentrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
