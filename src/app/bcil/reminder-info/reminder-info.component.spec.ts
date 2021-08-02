import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderInfoComponent } from './reminder-info.component';

describe('ReminderInfoComponent', () => {
  let component: ReminderInfoComponent;
  let fixture: ComponentFixture<ReminderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
