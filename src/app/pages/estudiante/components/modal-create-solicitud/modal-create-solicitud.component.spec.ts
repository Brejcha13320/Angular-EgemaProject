import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSolicitudComponent } from './modal-create-solicitud.component';

describe('ModalCreateSolicitudComponent', () => {
  let component: ModalCreateSolicitudComponent;
  let fixture: ComponentFixture<ModalCreateSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreateSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
