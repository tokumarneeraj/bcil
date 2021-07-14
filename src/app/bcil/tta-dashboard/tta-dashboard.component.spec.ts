import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtaDashboardComponent } from './tta-dashboard.component';

describe('TtaDashboardComponent', () => {
  let component: TtaDashboardComponent;
  let fixture: ComponentFixture<TtaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
