import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFooterComponent } from '@standalone/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from '@standalone/modal-header/modal-header.component';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [CommonModule, ModalHeaderComponent, ModalFooterComponent],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
})
export class ModalConfirmComponent {
  /**
   * Titulo del modal
   */
  @Input() title: string = '¿Esta seguro que desea realizar esta acción?';
  /**
   * Texto del modal
   */
  @Input() text: string = '';
  /**
   * Botones del footer
   */
  @Input() buttons: ButtonModalFooter[] = [
    {
      text: 'Estoy Seguro',
      idButton: 'ready',
      clase: 'success',
    },
    {
      text: 'Cancelar',
      idButton: 'cancelar',
      clase: 'danger',
    },
  ];

  constructor(
    public activeModal: NgbActiveModal // private notifyService: NotifyService, // private estudiantePropuestaService: EstudiantePropuestaService
  ) {}

  /**
   * Cierra el modal
   */
  close(idButton: string | null) {
    this.activeModal.close(idButton);
  }
}
