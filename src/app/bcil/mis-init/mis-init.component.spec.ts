import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisInitComponent } from './mis-init.component';

describe('MisInitComponent', () => {
  let component: MisInitComponent;
  let fixture: ComponentFixture<MisInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
