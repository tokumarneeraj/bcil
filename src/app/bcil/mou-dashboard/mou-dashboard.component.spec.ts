import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouDashboardComponent } from './mou-dashboard.component';

describe('MouDashboardComponent', () => {
  let component: MouDashboardComponent;
  let fixture: ComponentFixture<MouDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
