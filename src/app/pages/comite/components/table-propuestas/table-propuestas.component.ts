import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { Dropdown } from '@interfaces/dropdown.interface';
import { OptionsTable } from '@interfaces/options-table.interface';
import { EstadoPropuesta, Propuesta } from '@interfaces/propuesta.interface';

@Component({
  selector: 'app-table-propuestas',
  templateUrl: './table-propuestas.component.html',
  styleUrl: './table-propuestas.component.scss',
})
export class TablePropuestasComponent {
  /**
   * Titulo del alert que se va mostrar cuando no hay información
   */
  emptyDataTableTitle: string = 'No hay información para mostrar';
  /**
   * Texto del alert que se va mostrar cuando no hay información
   */
  emptyDataTableText: string =
    'Por el momento no se han encontrado propuestas de trabajo de grado.';
  /**
   * Nombre del estado
   */
  estadoMap: Record<EstadoPropuesta, string> = {
    APROBADO: 'Aprobado',
    PENDIENTE: 'Pendiente',
    CAMBIOS: '  Cambios',
    NO_APROBADO: 'No Aprobado',
  };
  /**
   * Clase segun el estado
   */
  estadoClassMap: Record<EstadoPropuesta, ClaseColor> = {
    APROBADO: 'success',
    PENDIENTE: 'primary',
    CAMBIOS: 'warning',
    NO_APROBADO: 'danger',
  };
  /**
   * Titulo que va ir en la secció
   */
  @Input() title: string = '';
  /**
   * Mensaje que acompaña al titulo
   */
  @Input() message: string = '';
  /**
   * Solicitudes de Trabajo de Grado
   */
  @Input() dataTable: Propuesta[] | null = null;
  /**
   * Titulos de la tabla
   */
  @Input() headersTable: string[] = [];
  /**
   * Dropdown y sus opciones
   */
  @Input() dropdown: Dropdown | null = null;
  /**
   * Eventos click
   */
  @Output() clickEvents: EventEmitter<{ idButton: string; idRow?: string }> =
    new EventEmitter();

  convertClaseColor(value: string) {
    return value as ClaseColor;
  }

  /**
   * Emite los eventos segun el dropdown
   * @param idButton id del boton precionado
   * @param idRow id de la propuesta
   */
  emitEvents(idButton: string, idRow?: string) {
    this.clickEvents.emit({ idButton, idRow });
  }
}
