import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkInitComponent } from './trademark-init.component';

describe('TrademarkInitComponent', () => {
  let component: TrademarkInitComponent;
  let fixture: ComponentFixture<TrademarkInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademarkInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
