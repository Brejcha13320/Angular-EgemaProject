import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TokenService } from '@auth-services/token.service';
import { environment } from '@environments/environment';
import { ClaseColor } from '@interfaces/clase-color.interface';
import {
  EstadoPropuesta,
  LineaInvestigacionPropuesta,
  Propuesta,
} from '@interfaces/propuesta.interface';
import { RolUser } from '@interfaces/user.interface';
import { AlertComponent } from '@standalone/alert/alert.component';
import { BadgeComponent } from '@standalone/badge/badge.component';
import { ButtonComponent } from '@standalone/button/button.component';
import { TitleSectionComponent } from '@standalone/title-section/title-section.component';

@Component({
  selector: 'app-detail-propuesta',
  standalone: true,
  imports: [
    CommonModule,
    TitleSectionComponent,
    ButtonComponent,
    BadgeComponent,
    AlertComponent,
  ],
  templateUrl: './detail-propuesta.component.html',
  styleUrl: './detail-propuesta.component.scss',
})
export class DetailPropuestaComponent {
  /**
   * Input para visualizar el titulo en la propuesta tanto en el estudiante, comite y docente
   */
  @Input() title: string = '';
  /**
   * Input para visualizar el mensaje en la propuesta tanto en el estudiante, comite y docente
   */
  @Input() message: string = '';
  /**
   * Esto es una alerta que muestra un titulo por defecto si aun no existe la propuesta
   */
  @Input() titleNotPropuesta: string = '';
  /**
   * Esto es una alerta que muestra un texto por defecto si aun no existe la propuesta
   */
  @Input() textNotPropuesta: string = '';
  /**
   * Input para visualizar la propuesta tanto en el estudiante, comite y docente
   */
  @Input() propuesta: Propuesta | null = null;
  /**
   * Texto de un button para redicreccionar atras
   */
  @Input() nameRedirect: string = 'Atrás';
  /**
   * Muestra los comentarios o no
   */
  @Input() shwoCometarios: boolean = true;
  /**
   * Emite un evento
   */
  @Output() redirect: EventEmitter<boolean> = new EventEmitter();

  /**
   * Nombre del estado
   */
  estadoMap: Record<
    RolUser | EstadoPropuesta | LineaInvestigacionPropuesta,
    string
  > = {
    ESTUDIANTE: 'Estudiante',
    DOCENTE: 'Docente',
    COMITE: 'Comité',
    JEFE_PRACTICA: 'Jefe Práctica',
    COORDINADOR_PRACTICA: 'Coordinador Práctica',
    ADMIN: 'Admin',

    APROBADO: 'Aprobado',
    PENDIENTE: 'Pendiente',
    CAMBIOS: '  Cambios',
    NO_APROBADO: 'No Aprobado',

    TELEMATICA_REDES: 'TELEMATICA Y REDES',
    INGENIERIA_SOFTWARE: 'INGENIERIA Y SOFTWARE',
    OTRA: 'OTRA',
  };
  /**
   * Clase segun el estado
   */
  estadoClassMap: Record<
    RolUser | EstadoPropuesta | LineaInvestigacionPropuesta,
    ClaseColor
  > = {
    ESTUDIANTE: 'success',
    DOCENTE: 'primary',
    COMITE: 'warning',
    JEFE_PRACTICA: 'danger',
    COORDINADOR_PRACTICA: 'info',
    ADMIN: 'light',

    APROBADO: 'success',
    PENDIENTE: 'primary',
    CAMBIOS: 'warning',
    NO_APROBADO: 'danger',

    TELEMATICA_REDES: 'info',
    INGENIERIA_SOFTWARE: 'warning',
    OTRA: 'dark',
  };

  /**
   * Constructor de la clase
   * @param tokenService
   */
  constructor(private tokenService: TokenService) {}

  /**
   * Descarga el archivo seleccionado
   * @param idFile id del file
   */
  downloadFile(idFile: string) {
    const token = this.tokenService.getToken();
    const urlDownload = `${environment.apiBaseUrl}/api/file/${token}/${idFile}`;
    window.open(urlDownload, '_blank');
  }

  /**
   * Redirecciona al comite a las propuestas
   */
  emitRedirect() {
    this.redirect.emit(true);
  }

  /**
   * Funcion relacionada con los estados, esta funcion permite darles el class del bootstrap
   * @param value
   * @returns
   */
  convertClaseColor(value: string) {
    return value as ClaseColor;
  }
}
