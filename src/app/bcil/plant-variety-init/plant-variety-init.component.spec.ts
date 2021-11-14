import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantVarietyInitComponent } from './plant-variety-init.component';

describe('PlantVarietyInitComponent', () => {
  let component: PlantVarietyInitComponent;
  let fixture: ComponentFixture<PlantVarietyInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantVarietyInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantVarietyInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
