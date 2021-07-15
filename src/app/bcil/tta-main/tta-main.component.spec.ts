import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtaMainComponent } from './tta-main.component';

describe('TtaMainComponent', () => {
  let component: TtaMainComponent;
  let fixture: ComponentFixture<TtaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtaMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
