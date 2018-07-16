import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesFeedbacksComponent } from './mes-feedbacks.component';

describe('MesFeedbacksComponent', () => {
  let component: MesFeedbacksComponent;
  let fixture: ComponentFixture<MesFeedbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesFeedbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
