import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnumberComponent } from './qnumber.component';

describe('QnumberComponent', () => {
  let component: QnumberComponent;
  let fixture: ComponentFixture<QnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
