import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TstlDashboardComponent } from './tstl-dashboard.component';

describe('TstlDashboardComponent', () => {
  let component: TstlDashboardComponent;
  let fixture: ComponentFixture<TstlDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TstlDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TstlDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
