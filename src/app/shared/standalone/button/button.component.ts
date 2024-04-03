import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { NgBootstrap } from '@third-party/ng-bootstrap.module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NgBootstrap],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  /**
   * String con el texto a mostrar en el boton
   */
  @Input() text: string = '';

  /**
   * String con el idUnico del boton, este id es el que retorna el evento click
   */
  @Input() idButton: string = '';

  /**
   * String con la clase de Bootstrap
   */
  @Input() clase: ClaseColor = 'primary';

  /**
   * Outline del Boton
   */
  @Input() outline: boolean = false;

  /**
   * Icono de bootstrapIcons
   */
  @Input() icon: string = '';

  /**
   * Esta variable define si el boton va con un width del 100% o auto segun el texto
   */
  @Input() widthType: 'normal' | 'full' = 'normal';

  /**
   * Texto del tooltip
   */
  @Input() tooltip: string = '';

  /**
   * Posicion del Tooltip
   */
  @Input() placement: 'top' | 'end' | 'bottom' | 'start' = 'top';

  /**
   * Esta variable define si el boton esta en estado disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Ubicacion del icono
   */
  @Input() iconDir: 'start' | 'end' = 'start';

  /**
   * Emite el Id del Boton para que el componente padre lo distinga y dispare los metodos correspondientes
   */
  @Output() clicker: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Se dispara al dar click en el boton y emite el idButton asignado al boton al componente padre
   */
  onEmit() {
    this.clicker.emit(this.idButton);
  }
}
