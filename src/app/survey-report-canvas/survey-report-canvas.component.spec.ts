import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportCanvasComponent } from './survey-report-canvas.component';

describe('SurveyReportCanvasComponent', () => {
  let component: SurveyReportCanvasComponent;
  let fixture: ComponentFixture<SurveyReportCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReportCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReportCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
