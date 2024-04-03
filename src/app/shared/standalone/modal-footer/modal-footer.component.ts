import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { ButtonComponent } from '@standalone/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-footer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal-footer.component.html',
  styleUrl: './modal-footer.component.scss',
})
export class ModalFooterComponent {
  /**
   * Arreglo de botones del footer
   */
  @Input() buttons: ButtonModalFooter[] = [];
  /**
   * Se dispara al dar click en el boton y emite el idButton asignado al boton al componente padre
   */
  /**
   * Emite el Id del Boton para que el componente padre lo distinga y dispare los metodos correspondientes
   */
  @Output() clicker: EventEmitter<string> = new EventEmitter<string>();

  /**
   *
   * @param idButton Emite el id del boton seleccionado
   */
  onEmit(idButton: string) {
    this.clicker.emit(idButton);
  }
}
