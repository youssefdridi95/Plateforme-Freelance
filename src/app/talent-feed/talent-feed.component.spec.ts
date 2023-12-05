import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentFeedComponent } from './talent-feed.component';

describe('TalentFeedComponent', () => {
  let component: TalentFeedComponent;
  let fixture: ComponentFixture<TalentFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalentFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
