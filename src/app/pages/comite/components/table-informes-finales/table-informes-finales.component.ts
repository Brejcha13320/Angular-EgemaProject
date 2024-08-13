import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { Dropdown } from '@interfaces/dropdown.interface';
import {
  EstadoInformeFinal,
  InformeFinal,
} from '@interfaces/informe-final.interface';

@Component({
  selector: 'app-table-informes-finales',
  templateUrl: './table-informes-finales.component.html',
  styleUrl: './table-informes-finales.component.scss',
})
export class TableInformesFinalesComponent {
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
  estadoMap: Record<EstadoInformeFinal, string> = {
    APROBADO: 'Aprobado',
    PENDIENTE: 'Pendiente',
    CAMBIOS: '  Cambios',
    NO_APROBADO: 'No Aprobado',
  };
  /**
   * Clase segun el estado
   */
  estadoClassMap: Record<EstadoInformeFinal, ClaseColor> = {
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
  @Input() dataTable: InformeFinal[] | null = null;
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
  @Output() clickEvents: EventEmitter<{
    idButton: string;
    informeFinalId: string;
  }> = new EventEmitter();

  convertClaseColor(value: string) {
    return value as ClaseColor;
  }

  /**
   * Emite los eventos segun el dropdown
   * @param idButton id del boton precionado
   * @param informeFinalId id del informe final
   */
  emitEvents(idButton: string, informeFinalId: string) {
    this.clickEvents.emit({ idButton, informeFinalId });
  }
}
