import { Component, OnInit } from '@angular/core';
import { NotifyService } from '@shared-services/notify.service';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';
import { EstudianteInformeFinalService } from '../../services/estudiante-informe-final.service';
import { Propuesta } from '@interfaces/propuesta.interface';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  EstadoInformeFinal,
  InformeFinal,
} from '@interfaces/informe-final.interface';
import { ModalCreateInformeFinalComponent } from '../modal-create-informe-final/modal-create-informe-final.component';
import { Dropdown } from '@interfaces/dropdown.interface';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-final',
  templateUrl: './informe-final.component.html',
  styleUrl: './informe-final.component.scss',
})
export class InformeFinalComponent implements OnInit {
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
  /**
   * Opciones de cada item del informe final
   */
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
   * Titulo de alerta cuando el usuario entra en informe final pero no tiene la propuesta en estado aprobado
   */
  titleNeedPropuesta = '¡No Existen Propuestas Aprobadas!';
  /**
   * Mensaje de alerta cuando el usuario entra en informe final pero no tiene la propuesta en estado aprobado
   */
  textNeedPropuesta =
    'No existen propuestas con estado aprobado en la plataforma. Para crear una propuesta, tienes que dirigirte a la sección de Propuesta y presiona el botón de Crear Propuesta, luego debes esperar que una persona del Comite Apruebe tu Propuesta.';
  /**
   * Titulo de alerta cuando el usuario entra en informe final pero no lo ha creado
   */
  titleNeedInformeFinal = '¡No Existen Informes Finales!';
  /**
   * Mensaje de alerta cuando el usuario entra en informe final pero no lo ha creado
   */
  textNeedInformeFinal =
    'No existen informes finales registrados en la plataforma. Para crear un informe final, presiona el botón de Crear Informe Final.';
  /**
   * Propuesta del estudiante, puede que exista o no
   */
  propuestas: Propuesta[] = [];
  /**
   * Informe Final del estudiante, puede que exista o no
   */
  informesFinales: InformeFinal[] = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private notifyService: NotifyService,
    private estudiantePropuestaService: EstudiantePropuestaService,
    private estudianteInformeFinalService: EstudianteInformeFinalService
  ) {}

  /**
   * onInit que llama la función para obtener la propuesta del estudiante
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Obtiene la propuesta y el informe final del estudiante si existe
   */
  getData() {
    forkJoin([
      this.estudiantePropuestaService.getPropuestasAprobadas(),
      this.estudianteInformeFinalService.getInformesFinales(),
    ]).subscribe({
      next: ([propuestas, informesFinales]) => {
        this.propuestas = propuestas;
        this.informesFinales = informesFinales;
      },
      error: (error) => {
        this.notifyService.open({
          clase: 'alert',
          title: 'Error al cargar las Propuestas y Informe Final',
          message:
            'Ha ocurrido un error al intentar cargar las propuestas y informe final',
        });
      },
    });
  }

  /**
   * Abre el modal para crear el informe final
   */
  openModalCreateInformeFinal() {
    const modalRef = this.modalService.open(ModalCreateInformeFinalComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });
    modalRef.componentInstance.propuestaId = this.propuestas[0].id;
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
  clickEvents(
    idButton: string,
    informeFinalId: string,
    estado: EstadoInformeFinal
  ) {
    switch (idButton) {
      case 'detalle':
        if (!informeFinalId) return;
        this.router.navigate([
          '/estudiante/trabajo-grado/informe-final',
          informeFinalId,
        ]);
        break;
      case 'editar-contenido':
        if (!informeFinalId || estado != 'CAMBIOS') {
          this.notifyService.open({
            clase: 'alert',
            title: 'No Puedes Editar',
            message:
              'Solo puedes editar tu informe final si su estado es CAMBIOS',
          });
          return;
        }

        // this.openModalCreatePropuesta(propuestaId);
        break;
      case 'editar-archivos':
        if (!informeFinalId || estado != 'CAMBIOS') {
          this.notifyService.open({
            clase: 'alert',
            title: 'No Puedes Editar',
            message:
              'Solo puedes editar tu informe final si su estado es CAMBIOS',
          });
          return;
        }

        // this.openModalUpdateArchivos(propuestaId);
        break;
      case 'update-pendiente':
        if (!informeFinalId || estado != 'CAMBIOS') {
          this.notifyService.open({
            clase: 'alert',
            title: 'No Puedes Editar',
            message:
              'Solo puedes actualizar tu informe final a PENDIENTE si su estado actual es CAMBIOS',
          });
          return;
        }

        // this.updateToPendiente();
        break;
    }
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
