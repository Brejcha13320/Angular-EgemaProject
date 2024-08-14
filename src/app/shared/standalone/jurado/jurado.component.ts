import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown } from '@interfaces/dropdown.interface';
import { JuradoInformeFinal } from '@interfaces/informe-final.interface';
import { RequestStatus } from '@interfaces/request-status.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JuradoService } from '@shared-services/jurado.service';
import { AlertComponent } from '@standalone/alert/alert.component';
import { ModalComentarJuradoComponent } from '@standalone/modal-comentar-jurado/modal-comentar-jurado.component';
import { ModalDetalleInformeFinalComponent } from '@standalone/modal-detalle-informe-final/modal-detalle-informe-final.component';
import { TableJuradosComponent } from '@standalone/table-jurados/table-jurados.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-jurado',
  standalone: true,
  imports: [CommonModule, AlertComponent, TableJuradosComponent],
  templateUrl: './jurado.component.html',
  styleUrl: './jurado.component.scss',
})
export class JuradoComponent implements OnInit {
  /**
   * Titulo de la sección
   */
  title: string = 'Jurado de Informe Final';
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
  dataTable$ = new BehaviorSubject<JuradoInformeFinal[]>([]);
  /**
   * Titulos de las columnas de la tabla
   */
  headersTable: string[] = [
    'EMAIL',
    'NOMBRE',
    'ESTADO',
    'ASIGNADO',
    'OPCIONES',
  ];
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
        idButton: 'comentar',
        text: 'Comentar',
        icon: 'person-plus',
        textColor: 'primary',
      },
    ],
  };

  constructor(
    private router: Router,
    private juradoService: JuradoService,
    private modalService: NgbModal
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
   * Obtiene la informacion del jurado
   * va actualizando el status para controlar los alert
   */
  getData() {
    this.status = 'loading';
    this.juradoService.getJuradoInformesFinales().subscribe({
      next: (juradoInformesFinales) => {
        this.status = 'success';
        this.emitDataTable(juradoInformesFinales);
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
  clickEvents(idButton: string, informeFinalId: string, juradoId: string) {
    switch (idButton) {
      case 'detalle':
        if (!informeFinalId) return;
        this.openModalDetalle(informeFinalId);
        break;
      case 'comentar':
        if (!juradoId) return;
        this.openModalComentario(juradoId);
        break;
    }
  }

  /**
   * Abre el modal para el detalle del informe
   * @param informeFinalId id del informe final
   */
  openModalDetalle(informeFinalId: string) {
    const modalRef = this.modalService.open(ModalDetalleInformeFinalComponent, {
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
   * Abre el modal para el comentario del informe
   * @param juradoId id del informe final
   */
  openModalComentario(juradoId: string) {
    const modalRef = this.modalService.open(ModalComentarJuradoComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });

    modalRef.componentInstance.juradoId = juradoId;

    modalRef.result.then((status) => {
      if (status) {
        this.getData();
      }
    });
  }

  /**
   * Recibe la data y hace next al observable
   * @param data data que va ser emitida en el observable
   */
  emitDataTable(juradoInformesFinales: JuradoInformeFinal[]) {
    this.dataTable$.next(juradoInformesFinales);
  }
}
