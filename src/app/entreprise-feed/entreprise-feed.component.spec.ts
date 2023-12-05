import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseFeedComponent } from './entreprise-feed.component';

describe('EntrepriseFeedComponent', () => {
  let component: EntrepriseFeedComponent;
  let fixture: ComponentFixture<EntrepriseFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrepriseFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
