import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '@auth-services/token.service';
import {
  InformeFinal,
  TipoInformeFinalFile,
} from '@interfaces/informe-final.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { EstudianteInformeFinalService } from '../../services/estudiante-informe-final.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-modal-update-archivos-informe',
  templateUrl: './modal-update-archivos-informe.component.html',
  styleUrl: './modal-update-archivos-informe.component.scss',
})
export class ModalUpdateArchivosInformeComponent implements OnInit {
  /**
   * Id de la informe final
   */
  @Input() informeFinalId: string | null = null;
  /**
   * Informe Final
   */
  informeFinal: InformeFinal | null = null;
  /**
   * File del informe final
   */
  informeFinalFile: any | null = null;

  /**
   * Constructor de la clase
   * @param fb dependecia para formularios
   * @param activeModal servcio para controlar el modal
   * @param notifyService servicio de notificaciones
   */
  constructor(
    private tokenService: TokenService,
    public activeModal: NgbActiveModal,
    private notifyService: NotifyService,
    private estudianteInformeFinalService: EstudianteInformeFinalService
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
   * Obtiene la data si existe el id de la informe final sino crear el formulario vacio
   */
  getData() {
    if (this.informeFinalId) {
      this.estudianteInformeFinalService
        .getInformeFinalById(this.informeFinalId)
        .subscribe({
          next: (informeFinal) => {
            console.log({ informeFinal });
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
   * Recibe el tipo del file y retorna le nombre
   * @param id id del file
   * @returns nombre del file
   */
  getFileName(tipo: TipoInformeFinalFile) {
    return this.informeFinal?.files.find((file) => tipo === file.tipo)?.file
      .name;
  }

  /**
   * Recibe el tipo del file y retorna le id
   * @param id id del file
   * @returns nombre del file
   */
  getFileId(tipo: TipoInformeFinalFile) {
    return this.informeFinal?.files.find((file) => tipo === file.tipo)?.file
      .id as string;
  }

  /**
   * Segun el evento change del input file, obtiene el archivo o lo agrega al formulario
   * @param e evento del file
   * @param control formulario donde se va guardar el file
   */
  changeFile(e: any, tipo: TipoInformeFinalFile) {
    const file = e.target.files[0];
    // console.log({ file });
    switch (tipo) {
      case 'INFORME_FINAL':
        //Guardar File cartaAceptacion
        this.informeFinalFile = file;
        break;
    }
  }

  /**
   * Recibe el tipo de archivo y segun el caso guarda alguno de los 2
   * @param tipo tipo de archivo seleccionado
   * @returns retorna null en caso de que no encuentre el file para cancelar el proceso
   */
  updateInformeFinalFile(tipo: TipoInformeFinalFile) {
    let informeFinalFileId: string | null = null;

    if (!this.informeFinal) return;

    switch (tipo) {
      case 'INFORME_FINAL':
        informeFinalFileId = this.getInformeFinalFileId('INFORME_FINAL');

        this.estudianteInformeFinalService
          .updateInformeFinalFile(
            this.informeFinal.id,
            informeFinalFileId,
            this.informeFinalFile
          )
          .subscribe({
            next: (informeFinal) => {
              this.notifyService.open({
                clase: 'success',
                title: 'Proceso Exitoso',
                message: 'Se ha actualizado el Informe Final de manera exitosa',
              });
              this.close(true);
            },
            error: (error) => {
              this.notifyService.open({
                clase: 'alert',
                title: 'Error al actualizar el Archivo',
                message:
                  'Ha ocurrido un error al intentar actualizar el Informe Final',
              });
            },
          });

        break;
    }
  }

  /**
   * Recibe tipo de archivo y retorna el id del informeFinalFile
   * @param tipo tipo del informeFinalFile
   * @returns retorna el id del informeFinalFile
   */
  getInformeFinalFileId(tipo: TipoInformeFinalFile): string {
    return (
      this.informeFinal?.files.filter((file) => file.tipo === tipo)[0].id || ''
    );
  }

  /**
   * Cierra el modal
   */
  close(status: boolean = false) {
    this.activeModal.close(status);
  }
}
