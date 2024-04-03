import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';
import { forkJoin } from 'rxjs';
import { SolicitudTrabajoGrado } from '@interfaces/solicitud-trabajo-grado.interface';
import { SolicitudTrabajoGradoService } from '../../services/solicitud-trabajo-grado.service';
import { EstadoPropuesta, Propuesta } from '@interfaces/propuesta.interface';
import { ModalCreatePropuestaComponent } from '../modal-create-propuesta/modal-create-propuesta.component';
import { Router } from '@angular/router';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { Dropdown } from '@interfaces/dropdown.interface';
import { ModalConfirmComponent } from '@standalone/modal-confirm/modal-confirm.component';
import { ButtonModalFooter } from '@interfaces/modal.inteface';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrl: './propuesta.component.scss',
})
export class PropuestaComponent implements OnInit {
  /**
   * Titulos de la tabla de propuestas
   */
  headersTable: string[] = [
    'EMAIL',
    'NOMBRE',
    'ESTADO',
    'FECHA DE CREACIÓN',
    'OPCIONES',
  ];
  dropdown: Dropdown = {
    clase: 'primary',
    options: [
      {
        idButton: 'detalle',
        text: 'Detalle',
        icon: 'eye',
        textColor: 'primary',
      },
      {
        idButton: 'editar-contenido',
        text: 'Editar Contenido',
        icon: 'pencil',
        textColor: 'primary',
      },
      {
        idButton: 'editar-archivos',
        text: 'Editar Archivos',
        icon: 'file-text',
        textColor: 'primary',
      },
      {
        idButton: 'update-pendiente',
        text: 'Actualizar a Pendiente',
        icon: 'check-circle',
        textColor: 'primary',
      },
    ],
  };
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
   * Titulo de alerta cuando el usuario entra en la propuesta pero no tiene la solicitud
   */
  titleNeedSolicitud: string = '¡No Existe una Solicitud de Trabajo de Grado!';
  /**
   * Mensaje de alerta cuando el usuario entra en la propuesta pero no tiene la solicitud
   */
  textNeedSolicitud: string =
    'Queremos informarte que antes de proceder con la creación de una propuesta, es indispensable que inicies el proceso creando una solicitud de trabajo de grado correspondiente. Esta solicitud servirá como base fundamental para la generación de tu propuesta y garantizará una alineación adecuada con los requerimientos y objetivos establecidos.';
  /**
   * Titulo de alerta cuando el usuario entra en la propuesta pero no lo ha creado
   */
  titleNeedPropuesta = '¡No Existen Propuestas!';
  /**
   * Mensaje de alerta cuando el usuario entra en la propuesta pero no lo ha creado
   */
  textNeedPropuesta =
    'No existen propuestas registradas en la plataforma. Para crear una propuesta, presiona el botón de Crear Propuesta.';
  /**
   * Solicitud del estudiante, puede que exista o no
   */
  solicitudesTrabajoGrado: SolicitudTrabajoGrado[] = [];
  /**
   * Propuesta del estudiante, puede que exista o no
   */
  propuestas: Propuesta[] = [];

  /**
   * constructor de la clase
   * @param modalService servicio para los modales
   * @param notifyService servicio de notificaciones
   * @param solicitudTrabajoGradoService servicio para las peticiones de las solicitudes
   */
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private notifyService: NotifyService,
    private estudiantePropuestaService: EstudiantePropuestaService,
    private solicitudTrabajoGradoService: SolicitudTrabajoGradoService
  ) {}

  /**
   * onInit que llama la función para obtener la propuesta del estudiante
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Obtiene la solicitud y de la propuesta del estudiante si existe
   */
  getData() {
    forkJoin([
      this.solicitudTrabajoGradoService.getSolicitudesTrabajoGrado(),
      this.estudiantePropuestaService.getPropuestas(),
    ]).subscribe({
      next: ([solicitudesTrabajoGrado, propuestas]) => {
        this.solicitudesTrabajoGrado = solicitudesTrabajoGrado;
        this.propuestas = propuestas;
      },
      error: (error) => {
        this.notifyService.open({
          clase: 'alert',
          title: 'Error al cargar las Solicitudes y Propuestas',
          message:
            'Ha ocurrido un error al intentar cargar las solicitudes y propuestas',
        });
      },
    });
  }

  /**
   * Abre el modal para crear la propuesta
   */
  openModalCreatePropuesta(propuestaId?: string) {
    const modalRef = this.modalService.open(ModalCreatePropuestaComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });

    modalRef.componentInstance.solicitudTrabajoGradoId =
      this.solicitudesTrabajoGrado[0].id;

    if (propuestaId) {
      modalRef.componentInstance.propuestaId = propuestaId;
    }

    modalRef.result.then((status) => {
      if (status) {
        this.getData();
      }
    });
  }

  /**
   * Eventos segun el boton precionado
   * @param idButton id del boton precionado
   * @param idPropuesta id de la propuesta
   */
  clickEvents(idButton: string, propuestaId: string, estado: EstadoPropuesta) {
    switch (idButton) {
      case 'detalle':
        if (!propuestaId) return;
        this.router.navigate([
          '/estudiante/trabajo-grado/propuesta',
          propuestaId,
        ]);
        break;
      case 'editar-contenido':
        if (!propuestaId || estado != 'CAMBIOS') {
          this.notifyService.open({
            clase: 'alert',
            title: 'No Puedes Editar',
            message: 'Solo puedes editar tu propuesta si su estado es CAMBIOS',
          });
          return;
        }
        this.openModalCreatePropuesta(propuestaId);
        break;
      case 'editar-archivos':
        if (!propuestaId || estado != 'CAMBIOS') {
          this.notifyService.open({
            clase: 'alert',
            title: 'No Puedes Editar',
            message: 'Solo puedes editar tu propuesta si su estado es CAMBIOS',
          });
          return;
        }
        break;
      case 'update-pendiente':
        if (!propuestaId || estado != 'CAMBIOS') {
          this.notifyService.open({
            clase: 'alert',
            title: 'No Puedes Editar',
            message:
              'Solo puedes actualizar tu propuesta a PENDIENTE si su estado actual es CAMBIOS',
          });
          return;
        }

        this.updateToPendiente();
        break;
    }
  }

  /**
   * Actualiza el estado a pendiente
   */
  async updateToPendiente() {
    const result = await this.updateToPendienteConfirm();
    if (result === 'ready') {
      console.log('va hacer update');
    }
  }

  /**
   * Modal de Confirmacion
   * @returns respuesta del modal
   */
  async updateToPendienteConfirm() {
    const modalConfirmRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });
    modalConfirmRef.componentInstance.text =
      'El estado de la propuesta será PENDIENTE, y estará sujeta a revisión por el COMITÉ. Es importante recordar que durante este proceso no podrás editar tu propuesta.';
    return modalConfirmRef.result.then((result) => result);
  }

  /**
   * Recibe un string y lo convierte en ClaseColor
   * @param value string que hace referencia a ClaseColor
   * @returns retorna un tipo ClaseColor
   */
  convertClaseColor(value: string) {
    return value as ClaseColor;
  }
}
