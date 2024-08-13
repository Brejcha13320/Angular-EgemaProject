import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarEstadoComponent } from './modal-editar-estado.component';

describe('ModalEditarEstadoComponent', () => {
  let component: ModalEditarEstadoComponent;
  let fixture: ComponentFixture<ModalEditarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditarEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
