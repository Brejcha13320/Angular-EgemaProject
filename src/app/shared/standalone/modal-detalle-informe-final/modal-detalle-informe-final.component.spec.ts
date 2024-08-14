import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleInformeFinalComponent } from './modal-detalle-informe-final.component';

describe('ModalDetalleInformeFinalComponent', () => {
  let component: ModalDetalleInformeFinalComponent;
  let fixture: ComponentFixture<ModalDetalleInformeFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetalleInformeFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDetalleInformeFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
