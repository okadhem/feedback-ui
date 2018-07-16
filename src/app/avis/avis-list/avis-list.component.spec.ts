import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisListComponent } from './avis-list.component';

describe('AvisListComponent', () => {
  let component: AvisListComponent;
  let fixture: ComponentFixture<AvisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
