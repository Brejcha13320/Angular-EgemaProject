import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticaProfesionalComponent } from './practica-profesional.component';

describe('PracticaProfesionalComponent', () => {
  let component: PracticaProfesionalComponent;
  let fixture: ComponentFixture<PracticaProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticaProfesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticaProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
