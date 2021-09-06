import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouApplicationComponent } from './mou-application.component';

describe('MouApplicationComponent', () => {
  let component: MouApplicationComponent;
  let fixture: ComponentFixture<MouApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
