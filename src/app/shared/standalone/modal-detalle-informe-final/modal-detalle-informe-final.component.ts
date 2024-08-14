import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { ModalFooterComponent } from '@standalone/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from '@standalone/modal-header/modal-header.component';
import { InformeFinal } from '@interfaces/informe-final.interface';
import { CommonModule } from '@angular/common';
import { DetailInformeFinalComponent } from '../detail-informe-final/detail-informe-final.component';
import { JuradoService } from '@shared-services/jurado.service';

@Component({
  selector: 'app-modal-detalle-informe-final',
  standalone: true,
  imports: [
    CommonModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    DetailInformeFinalComponent,
  ],
  templateUrl: './modal-detalle-informe-final.component.html',
  styleUrl: './modal-detalle-informe-final.component.scss',
})
export class ModalDetalleInformeFinalComponent implements OnInit {
  /**
   * id del informe final
   */
  @Input({ required: true }) informeFinalId: string = '';
  /**
   * Titulo de la sección
   */
  title: string = 'Detalle del Informe Final';
  /**
   * Mensaje de la sección
   */
  message: string =
    'A continuación, te proporcionamos una descripción detallada de la propuesta en cuestión. Este análisis exhaustivo busca brindarte una visión completa de los elementos clave y consideraciones asociadas con esta propuesta específica.';
  /**
   * Titulo de la alerta si no cuentra del informe final
   */
  titleNotInformeFinal = 'No existe el Informe Final';
  /**
   * Mensaje de la alerta si no encuentra del informe final
   */
  textNotInformeFinal =
    'No existe el Informe Final de trabajo de grado que estas intentando buscar';
  /**
   * Informe Final
   */
  informeFinal: InformeFinal | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private notifyService: NotifyService,
    private juradoService: JuradoService
  ) {}

  /**
   * Llama la función para crear el formulario
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 200);
  }

  /**
   * consulta del informe final
   * segun el id y crea el formControl del estado
   */
  getData() {
    this.juradoService
      .getJuradoInformeFinalById(this.informeFinalId)
      .subscribe({
        next: (informeFinal) => {
          this.informeFinal = informeFinal;
        },
        error: (error) => {
          this.notifyService.open({
            title: 'Error al buscar el informe final',
            message: 'Ha ocurrido un error al buscar el informe final',
            clase: 'alert',
          });
          this.close();
        },
      });
  }

  /**
   * Cierra el modal
   */
  close(status: boolean = false) {
    this.activeModal.close(status);
  }
}
