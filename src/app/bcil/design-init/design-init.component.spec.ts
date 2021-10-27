import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignInitComponent } from './design-init.component';

describe('DesignInitComponent', () => {
  let component: DesignInitComponent;
  let fixture: ComponentFixture<DesignInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
