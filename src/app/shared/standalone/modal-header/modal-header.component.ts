import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '@standalone/button/button.component';

@Component({
  selector: 'app-modal-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss',
})
export class ModalHeaderComponent {
  /**
   * Titulo del modal
   */
  @Input() title: string = '';
  /**
   * Icono del close del modal
   */
  @Input() icon: string = 'x-lg';
  /**
   * Icono del close del modal
   */
  @Input() clase: ClaseColor = 'secondary';
  /**
   * Emite el Id del Boton para que el componente padre lo distinga y dispare los metodos correspondientes
   */
  @Output() clicker: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Constructor de la clase
   * @param activeModal servcio para controlar el modal
   */
  constructor(public activeModal: NgbActiveModal) {}

  /**
   * Se dispara al dar click en el boton y emite el idButton asignado al boton al componente padre
   */
  onEmit() {
    this.clicker.emit('close');
  }
}
