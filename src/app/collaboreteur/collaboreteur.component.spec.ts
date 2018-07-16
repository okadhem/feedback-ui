import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboreteurComponent } from './collaboreteur.component';

describe('CollaboreteurComponent', () => {
  let component: CollaboreteurComponent;
  let fixture: ComponentFixture<CollaboreteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboreteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboreteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
