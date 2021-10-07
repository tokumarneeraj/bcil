import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScientistComponent } from './add-scientist.component';

describe('AddScientistComponent', () => {
  let component: AddScientistComponent;
  let fixture: ComponentFixture<AddScientistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScientistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScientistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
