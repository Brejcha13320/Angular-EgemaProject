import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CreateSolicitudTrabajoGrado,
  OpcionSolicitudTrabajoGrado,
  SolicitudTrabajoGrado,
} from '@interfaces/solicitud-trabajo-grado.interface';
import { NotifyService } from '@shared-services/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateSolicitudComponent } from '../modal-create-solicitud/modal-create-solicitud.component';
import { SolicitudTrabajoGradoService } from '../../services/solicitud-trabajo-grado.service';
import { ClaseColor } from '@interfaces/clase-color.interface';

@Component({
  selector: 'app-solicitud-trabajo-grado',
  templateUrl: './solicitud-trabajo-grado.component.html',
  styleUrl: './solicitud-trabajo-grado.component.scss',
})
export class SolicitudTrabajoGradoComponent implements OnInit, OnDestroy {
  /**
   * Titulos de la tabla de solicitudes
   */
  headersTable: string[] = [
    'EMAIL',
    'NOMBRE',
    'OPCIÓN DE TRABAJO DE GRADO',
    'FECHA DE CREACIÓN',
  ];
  /**
   * Titulo de alerta cuando el usuario entra en la propuesta pero no tiene la solicitud
   */
  titleNeedSolicitud = '¡No Existen Solicitudes!';
  /**
   * Mensaje de alerta cuando el usuario entra en la propuesta pero no tiene la solicitud
   */
  textNeedSolicitud =
    'No existen solicitudes de trabajo de grado registradas en la plataforma. Para crear una solicitud, presiona el botón de Crear Solicitud.';
  /**
   * Solicitud del estudiante, puede que exista o no
   */
  solicitudesTrabajoGrado: SolicitudTrabajoGrado[] = [];
  /**
   * Nombre del estado
   */
  estadoMap: Record<OpcionSolicitudTrabajoGrado, string> = {
    TRABAJO_GRADO: 'Trabajo Grado',
    INVESTIGACION: 'Investigación',
    ESPECIALIZACION: 'Especialización',
    PRUEBAS_SABER_PRO: 'Pruebas Saber Pro',
  };
  /**
    * Clase segun el estado
    */
  estadoClassMap: Record<OpcionSolicitudTrabajoGrado, ClaseColor> = {
    TRABAJO_GRADO: 'success',
    INVESTIGACION: 'primary',
    ESPECIALIZACION: 'warning',
    PRUEBAS_SABER_PRO: 'danger',
  };
  /**
   * constructor de la clase
   * @param modalService servicio para los modales
   * @param notifyService servicio de notificaciones
   * @param solicitudTrabajoGradoService servicio para las peticiones de las solicitudes
   */
  constructor(
    private modalService: NgbModal,
    private notifyService: NotifyService,
    private solicitudTrabajoGradoService: SolicitudTrabajoGradoService
  ) { }

  /**
   * onInit que llama la función para obtener la solicitud del estudiante
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Hace el unsubscribe de todos los observables de peticiones http
   */
  ngOnDestroy(): void {
  }

  /**
   * Obtiene la solicitud del estudiante si existe
   */
  getData() {
    this.solicitudTrabajoGradoService
      .getSolicitudesTrabajoGrado()
      .subscribe({
        next: (solicitudesTrabajoGrado) => {
          this.solicitudesTrabajoGrado = solicitudesTrabajoGrado;
        },
        error: (error) => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Error al cargar las Solicitudes',
            message: 'Ha ocurrido un error al intentar cargar las solicitudes',
          });
        },
      });
  }

  /**
   * Abre el modal para crear la solicitud
   */
  openModalCreateSolicitud() {
    const modalRef = this.modalService
      .open(ModalCreateSolicitudComponent, {
        centered: true,
        scrollable: true,
        size: 'lg',
      })
      .result.then((data: CreateSolicitudTrabajoGrado | null) => {
        if (data) {
          this.createSolicitud(data);
        }
      });
  }

  /**
   * Crea la solicitud si el formulario es valido
   * @returns returna null en caso de que no sea valido el formulario
   */
  createSolicitud(data: CreateSolicitudTrabajoGrado) {
    this.solicitudTrabajoGradoService
      .createSolicitudTrabajoGrado(data)
      .subscribe({
        next: () => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'La solicitud se ha creado de manera exitosa',
          });
          this.getData();
        },
        error: () => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Error al crear la Solicitud',
            message: 'Ha ocurrido un error al intentar crear la solicitud',
          });
        },
      });
  }

  convertClaseColor(value: string) {
    return value as ClaseColor;
  }
}
