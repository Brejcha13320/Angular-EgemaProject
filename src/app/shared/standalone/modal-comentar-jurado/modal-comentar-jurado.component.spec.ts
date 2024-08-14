import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComentarJuradoComponent } from './modal-comentar-jurado.component';

describe('ModalComentarJuradoComponent', () => {
  let component: ModalComentarJuradoComponent;
  let fixture: ComponentFixture<ModalComentarJuradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComentarJuradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComentarJuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
