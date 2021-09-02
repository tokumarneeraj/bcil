import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionFileComponent } from './addition-file.component';

describe('AdditionFileComponent', () => {
  let component: AdditionFileComponent;
  let fixture: ComponentFixture<AdditionFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
