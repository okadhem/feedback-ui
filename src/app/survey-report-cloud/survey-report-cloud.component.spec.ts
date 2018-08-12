import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportCloudComponent } from './survey-report-cloud.component';

describe('SurveyReportCloudComponent', () => {
  let component: SurveyReportCloudComponent;
  let fixture: ComponentFixture<SurveyReportCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReportCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReportCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
