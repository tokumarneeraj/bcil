import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlpMainComponent } from './tlp-main.component';

describe('TlpMainComponent', () => {
  let component: TlpMainComponent;
  let fixture: ComponentFixture<TlpMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlpMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
