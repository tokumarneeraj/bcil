import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcilDashboardComponent } from './bcil-dashboard.component';

describe('BcilDashboardComponent', () => {
  let component: BcilDashboardComponent;
  let fixture: ComponentFixture<BcilDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcilDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcilDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
