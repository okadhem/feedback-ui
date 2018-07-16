import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPubliquesComponent } from './feedback-publiques.component';

describe('FeedbackPubliquesComponent', () => {
  let component: FeedbackPubliquesComponent;
  let fixture: ComponentFixture<FeedbackPubliquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackPubliquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPubliquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
