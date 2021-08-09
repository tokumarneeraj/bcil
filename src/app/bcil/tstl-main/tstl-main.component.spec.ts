import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TstlMainComponent } from './tstl-main.component';

describe('TstlMainComponent', () => {
  let component: TstlMainComponent;
  let fixture: ComponentFixture<TstlMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TstlMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TstlMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
