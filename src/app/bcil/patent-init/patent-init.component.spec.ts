import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentInitComponent } from './patent-init.component';

describe('PatentInitComponent', () => {
  let component: PatentInitComponent;
  let fixture: ComponentFixture<PatentInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
