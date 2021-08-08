import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttsaMainComponent } from './nttsa-main.component';

describe('NttsaMainComponent', () => {
  let component: NttsaMainComponent;
  let fixture: ComponentFixture<NttsaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttsaMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttsaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
