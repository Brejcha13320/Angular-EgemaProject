import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarJuradosComponent } from './modal-asignar-jurados.component';

describe('ModalAsignarJuradosComponent', () => {
  let component: ModalAsignarJuradosComponent;
  let fixture: ComponentFixture<ModalAsignarJuradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAsignarJuradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAsignarJuradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
