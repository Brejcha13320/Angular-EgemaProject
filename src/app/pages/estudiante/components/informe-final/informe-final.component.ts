import { Component, OnInit } from '@angular/core';
import { NotifyService } from '@shared-services/notify.service';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';
import { EstudianteInformeFinalService } from '../../services/estudiante-informe-final.service';
import { Propuesta } from '@interfaces/propuesta.interface';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-informe-final',
  templateUrl: './informe-final.component.html',
  styleUrl: './informe-final.component.scss',
})
export class InformeFinalComponent implements OnInit {
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
  informeFinal: any[] = [];

  constructor(
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
    ]).subscribe({
      next: ([propuestas]) => {
        this.propuestas = propuestas;
        console.log(this.propuestas);
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
    // const modalRef = this.modalService.open(ModalCreatePropuestaComponent, {
    //   centered: true,
    //   scrollable: true,
    //   size: 'lg',
    // });
    // modalRef.componentInstance.solicitudTrabajoGradoId =
    //   this.solicitudesTrabajoGrado[0].id;
    // modalRef.result.then((status) => {
    //   if (status) {
    //     this.getData();
    //   }
    // });
  }
}
