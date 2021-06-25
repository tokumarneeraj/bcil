import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcilComponent } from './bcil.component';

describe('BcilComponent', () => {
  let component: BcilComponent;
  let fixture: ComponentFixture<BcilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
