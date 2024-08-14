import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { Dropdown } from '@interfaces/dropdown.interface';
import {
  EstadoInformeFinal,
  JuradoInformeFinal,
} from '@interfaces/informe-final.interface';
import { AlertComponent } from '@standalone/alert/alert.component';
import { BadgeComponent } from '@standalone/badge/badge.component';
import { DropdownComponent } from '@standalone/dropdown/dropdown.component';
import { ItemEmailComponent } from '@standalone/item-email/item-email.component';
import { TitleSectionComponent } from '@standalone/title-section/title-section.component';

@Component({
  selector: 'app-table-jurados',
  standalone: true,
  imports: [
    CommonModule,
    TitleSectionComponent,
    AlertComponent,
    ItemEmailComponent,
    BadgeComponent,
    DropdownComponent,
  ],
  templateUrl: './table-jurados.component.html',
  styleUrl: './table-jurados.component.scss',
})
export class TableJuradosComponent {
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
  @Input() dataTable: JuradoInformeFinal[] | null = null;
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
    juradoId: string;
  }> = new EventEmitter();

  convertClaseColor(value: string) {
    return value as ClaseColor;
  }

  /**
   * Emite los eventos segun el dropdown
   * @param idButton id del boton precionado
   * @param informeFinalId id del informe final
   */
  emitEvents(idButton: string, informeFinalId: string, juradoId: string) {
    this.clickEvents.emit({ idButton, informeFinalId, juradoId });
  }
}
