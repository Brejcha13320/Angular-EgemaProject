import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dropdown } from '../../../interfaces/dropdown.interface';
import { CommonModule } from '@angular/common';
import { NgBootstrap } from '@third-party/ng-bootstrap.module';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, NgBootstrap],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  /**
   * Dropdown y sus opciones
   */
  @Input() dropdown: Dropdown | null = null;
  /**
   * Emite el Id del Boton para que el componente padre lo distinga y dispare los metodos correspondientes
   */
  @Output() clicker: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Se dispara al dar click en la opcion y emite el idButton asignado al boton al componente padre
   */
  onEmit(idButton: string) {
    this.clicker.emit(idButton);
  }
}
