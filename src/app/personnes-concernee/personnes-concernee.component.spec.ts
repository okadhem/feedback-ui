import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnesConcerneeComponent } from './personnes-concernee.component';

describe('PersonnesConcerneeComponent', () => {
  let component: PersonnesConcerneeComponent;
  let fixture: ComponentFixture<PersonnesConcerneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnesConcerneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnesConcerneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
