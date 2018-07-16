import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAvisComponent } from './detail-avis.component';

describe('DetailAvisComponent', () => {
  let component: DetailAvisComponent;
  let fixture: ComponentFixture<DetailAvisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAvisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
