import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtextComponent } from './qtext.component';

describe('QtextComponent', () => {
  let component: QtextComponent;
  let fixture: ComponentFixture<QtextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
