import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  EstadoInformeFinal,
  InformeFinal,
} from '@interfaces/informe-final.interface';
import { RequestStatus } from '@interfaces/request-status.interface';
import { BehaviorSubject } from 'rxjs';
import { ComiteInformeFinalService } from '../../services/comite-informe-final.service';
import { Dropdown } from '@interfaces/dropdown.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAsignarJuradosComponent } from '../../components/modal-asignar-jurados/modal-asignar-jurados.component';
import { ModalEditarEstadoComponent } from '../../components/modal-editar-estado/modal-editar-estado.component';

@Component({
  templateUrl: './informes-finales.component.html',
  styleUrl: './informes-finales.component.scss',
})
export class InformesFinalesComponent {
  /**
   * Titulo de la sección
   */
  title: string = 'Informes Finales de Trabajo de Grado';
  /**
   * Mensaje de la sección
   */
  message: string =
    'Esta sección te permite controlar los estados y hacer seguimiento a las propuestas de trabajo de grado. Obtén asistencia personalizada y asegúrate de avanzar de manera precisa en cada etapa de tu proyecto académico.';
  /**
   * Status de la peticion http de las propuestas
   */
  status: RequestStatus = 'init';
  /**
   * Data de las propuestas en un observable
   */
  dataTable$ = new BehaviorSubject<InformeFinal[]>([]);
  /**
   * Titulos de las columnas de la tabla
   */
  headersTable: string[] = ['EMAIL', 'NOMBRE', 'ESTADO', 'CREADO', 'OPCIONES'];
  /**
   * Opciones de cada item en la propuesta
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
        idButton: 'asignar-jurados',
        text: 'Asignar Jurados',
        icon: 'person-plus',
        textColor: 'primary',
      },
      {
        idButton: 'editar-estado',
        text: 'Editar Estado',
        icon: 'pencil',
        textColor: 'primary',
      },
    ],
  };

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private comiteInformeFinalService: ComiteInformeFinalService
  ) {}

  /**
   * Llama el metodo getData para obtener la informacion
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Cuando finalize todo el ciclo de vida hace el unsubscribe de los
   * observables abiertos
   */
  ngOnDestroy(): void {
    this.dataTable$?.unsubscribe();
  }

  /**
   * Obtiene la informacion de las solicitudes de trabajo de grado y el proceso
   * va actualizando el status para controlar los alert
   */
  getData() {
    this.status = 'loading';
    this.comiteInformeFinalService.getInformesFinales().subscribe({
      next: (propuestas) => {
        this.status = 'success';
        this.emitDataTable(propuestas);
      },
      error: (error) => {
        this.status = 'error';
      },
    });
  }

  /**
   * Recibe el id del boton y del row y luego llama la función necesaria
   * dependiento el case del boton seleccionado
   * @param idButton id del boton clickeado
   * @param informeFinalId id de row en el cual se ha clickeado un boton
   */
  clickEvents(idButton: string, informeFinalId: string) {
    switch (idButton) {
      case 'detalle':
        if (!informeFinalId) return;
        this.router.navigate([
          '/comite/informes-finales/informe-final',
          informeFinalId,
        ]);
        break;
      case 'asignar-jurados':
        if (!informeFinalId) return;
        this.openModalAsignarJurados(informeFinalId);
        break;
      case 'editar-estado':
        if (!informeFinalId) return;
        this.openModalEditarEstado(informeFinalId);
        break;
    }
  }

  /**
   * Abre el modal para asignar jurados
   * @param informeFinalId id del informe final
   */
  openModalAsignarJurados(informeFinalId: string) {
    const modalRef = this.modalService.open(ModalAsignarJuradosComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });

    modalRef.componentInstance.informeFinalId = informeFinalId;

    modalRef.result.then((status) => {
      if (status) {
        this.getData();
      }
    });
  }

  /**
   * Abre el modal para el estado del informe
   * @param informeFinalId id del informe final
   */
  openModalEditarEstado(informeFinalId: string) {
    const modalRef = this.modalService.open(ModalEditarEstadoComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });

    modalRef.componentInstance.informeFinalId = informeFinalId;

    modalRef.result.then((status) => {
      if (status) {
        this.getData();
      }
    });
  }

  /**
   * Muestra el detalle del informe final
   * @param idInformeFinal id del informe final seleccionado
   */
  detalleInformeFinal(idInformeFinal: string) {
    this.router.navigate([
      '/comite/informes-finales/informe-final',
      idInformeFinal,
    ]);
  }

  /**
   * Recibe la data y hace next al observable
   * @param data data que va ser emitida en el observable
   */
  emitDataTable(informesFinales: InformeFinal[]) {
    this.dataTable$.next(informesFinales);
  }
}
