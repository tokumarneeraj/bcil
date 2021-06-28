import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouAddComponent } from './mou-add.component';

describe('MouAddComponent', () => {
  let component: MouAddComponent;
  let fixture: ComponentFixture<MouAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
