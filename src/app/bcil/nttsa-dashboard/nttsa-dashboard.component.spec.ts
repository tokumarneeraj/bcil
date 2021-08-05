import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttsaDashboardComponent } from './nttsa-dashboard.component';

describe('NttsaDashboardComponent', () => {
  let component: NttsaDashboardComponent;
  let fixture: ComponentFixture<NttsaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttsaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttsaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
