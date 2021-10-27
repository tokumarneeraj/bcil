import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightInitComponent } from './copyright-init.component';

describe('CopyrightInitComponent', () => {
  let component: CopyrightInitComponent;
  let fixture: ComponentFixture<CopyrightInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyrightInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
