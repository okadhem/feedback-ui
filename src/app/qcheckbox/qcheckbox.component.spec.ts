import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcheckboxComponent } from './qcheckbox.component';

describe('QcheckboxComponent', () => {
  let component: QcheckboxComponent;
  let fixture: ComponentFixture<QcheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
