import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPreviewComponent } from './cv-preview.component';

describe('CvPreviewComponent', () => {
  let component: CvPreviewComponent;
  let fixture: ComponentFixture<CvPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvPreviewComponent]
    });
    fixture = TestBed.createComponent(CvPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
