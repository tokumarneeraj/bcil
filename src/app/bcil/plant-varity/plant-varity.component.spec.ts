import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantVarityComponent } from './plant-varity.component';

describe('PlantVarityComponent', () => {
  let component: PlantVarityComponent;
  let fixture: ComponentFixture<PlantVarityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantVarityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantVarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
