import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LufInvoiceComponent } from './luf-invoice.component';

describe('LufInvoiceComponent', () => {
  let component: LufInvoiceComponent;
  let fixture: ComponentFixture<LufInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LufInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LufInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
