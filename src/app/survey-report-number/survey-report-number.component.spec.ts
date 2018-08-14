import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportNumberComponent } from './survey-report-number.component';

describe('SurveyReportNumberComponent', () => {
  let component: SurveyReportNumberComponent;
  let fixture: ComponentFixture<SurveyReportNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReportNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReportNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
