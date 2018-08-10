import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QdatetimeComponent } from './qdatetime.component';

describe('QdatetimeComponent', () => {
  let component: QdatetimeComponent;
  let fixture: ComponentFixture<QdatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QdatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QdatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
