import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResponseListComponent } from './survey-response-list.component';

describe('SurveyResponseListComponent', () => {
  let component: SurveyResponseListComponent;
  let fixture: ComponentFixture<SurveyResponseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResponseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
