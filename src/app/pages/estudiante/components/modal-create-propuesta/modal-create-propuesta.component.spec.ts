import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePropuestaComponent } from './modal-create-propuesta.component';

describe('ModalCreatePropuestaComponent', () => {
  let component: ModalCreatePropuestaComponent;
  let fixture: ComponentFixture<ModalCreatePropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreatePropuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreatePropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
