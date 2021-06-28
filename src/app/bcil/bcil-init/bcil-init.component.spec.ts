import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcilInitComponent } from './bcil-init.component';

describe('BcilInitComponent', () => {
  let component: BcilInitComponent;
  let fixture: ComponentFixture<BcilInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcilInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcilInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
