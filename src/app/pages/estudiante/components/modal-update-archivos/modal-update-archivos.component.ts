import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';
import { Propuesta } from '@interfaces/propuesta.interface';
import { TokenService } from '@auth-services/token.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-modal-update-archivos',
  templateUrl: './modal-update-archivos.component.html',
  styleUrl: './modal-update-archivos.component.scss',
})
export class ModalUpdateArchivosComponent implements OnInit {
  /**
   * Id de la propuesta
   */
  @Input() propuestaId: string | null = null;
  /**
   * Propuesta
   */
  propuesta: Propuesta | null = null;

  /**
   * Constructor de la clase
   * @param fb dependecia para formularios
   * @param activeModal servcio para controlar el modal
   * @param notifyService servicio de notificaciones
   */
  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    public activeModal: NgbActiveModal,
    private notifyService: NotifyService,
    private estudiantePropuestaService: EstudiantePropuestaService
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
   * Obtiene la data si existe el id de la propuesta sino crear el formulario vacio
   */
  getData() {
    if (this.propuestaId) {
      this.estudiantePropuestaService
        .getPropuestaById(this.propuestaId)
        .subscribe({
          next: (propuesta) => {
            console.log({ propuesta });
            this.propuesta = propuesta;
          },
          error: (error) => {
            this.notifyService.open({
              title: 'Error al buscar la propuesta',
              message: 'Ha ocurrido un error al buscar la propuesta',
              clase: 'alert',
            });
            this.close();
          },
        });
    } else {
      this.close();
    }
  }

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
   * Recibe el id del file y retorna le nombre
   * @param id id del file
   * @returns nombre del file
   */
  getFileName(id: string) {
    return this.propuesta?.files.find((file) => id === file.id)?.name;
  }

  /**
   * Segun el evento change del input file, obtiene el archivo o lo agrega al formulario
   * @param e evento del file
   * @param control formulario donde se va guardar el file
   */
  changeFile(
    e: any,
    control: 'cartaAceptacionDirector' | 'propuestaTrabajoGrado'
  ) {
    const file = e.target.files[0];
    console.log({ file });
    switch (control) {
      case 'cartaAceptacionDirector':
        //Guardar File cartaAceptacionDirector
        break;
      case 'propuestaTrabajoGrado':
        //Guardar File propuestaTrabajoGrado
        break;
    }
  }

  /**
   * Cierra el modal
   */
  close(status: boolean = false) {
    this.activeModal.close(status);
  }
}
