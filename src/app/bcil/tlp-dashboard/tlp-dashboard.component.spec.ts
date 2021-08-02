import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlpDashboardComponent } from './tlp-dashboard.component';

describe('TlpDashboardComponent', () => {
  let component: TlpDashboardComponent;
  let fixture: ComponentFixture<TlpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
