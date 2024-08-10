import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';
import { Propuesta, TipoPropuestaFile } from '@interfaces/propuesta.interface';
import { TokenService } from '@auth-services/token.service';
import { environment } from '@environments/environment';
import { ButtonModalFooter } from '@interfaces/modal.inteface';

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
   * File de la carta de aceptacion
   */
  cartaAceptacionFile: any | null = null;
  /**
   * File de la propuesta trabajo de grado
   */
  propuestaTrabajoGradoFile: any | null = null;

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
   * Recibe el tipo del file y retorna le nombre
   * @param id id del file
   * @returns nombre del file
   */
  getFileName(tipo: TipoPropuestaFile) {
    return this.propuesta?.files.find((file) => tipo === file.tipo)?.file.name;
  }

  /**
   * Recibe el tipo del file y retorna le id
   * @param id id del file
   * @returns nombre del file
   */
  getFileId(tipo: TipoPropuestaFile) {
    return this.propuesta?.files.find((file) => tipo === file.tipo)?.file
      .id as string;
  }

  /**
   * Segun el evento change del input file, obtiene el archivo o lo agrega al formulario
   * @param e evento del file
   * @param control formulario donde se va guardar el file
   */
  changeFile(e: any, tipo: TipoPropuestaFile) {
    const file = e.target.files[0];
    // console.log({ file });
    switch (tipo) {
      case 'CARTA_ACEPTACION_DIRECTOR':
        //Guardar File cartaAceptacion
        this.cartaAceptacionFile = file;
        break;
      case 'PROPUESTA_TRABAJO_GRADO':
        //Guardar File propuestaTrabajoGrado
        this.propuestaTrabajoGradoFile = file;
        break;
    }
  }

  /**
   * Recibe el tipo de archivo y segun el caso guarda alguno de los 2
   * @param tipo tipo de archivo seleccionado
   * @returns retorna null en caso de que no encuentre el file para cancelar el proceso
   */
  updatePropuestaFile(tipo: TipoPropuestaFile) {
    let propuestaFileId: string | null = null;

    if (!this.propuesta) return;

    switch (tipo) {
      case 'CARTA_ACEPTACION_DIRECTOR':
        propuestaFileId = this.getPropuestaFileId('CARTA_ACEPTACION_DIRECTOR');

        this.estudiantePropuestaService
          .updatePropuestaFile(
            this.propuesta.id,
            propuestaFileId,
            this.cartaAceptacionFile
          )
          .subscribe({
            next: (propuesta) => {
              this.notifyService.open({
                clase: 'success',
                title: 'Proceso Exitoso',
                message:
                  'Se ha actualizado la Carta de Aceptación de manera exitosa',
              });
              this.close(true);
            },
            error: (error) => {
              this.notifyService.open({
                clase: 'alert',
                title: 'Error al actualizar el Archivo',
                message:
                  'Ha ocurrido un error al intentar actualizar la Carta de Aceptación',
              });
            },
          });

        break;
      case 'PROPUESTA_TRABAJO_GRADO':
        propuestaFileId = this.getPropuestaFileId('PROPUESTA_TRABAJO_GRADO');

        this.estudiantePropuestaService
          .updatePropuestaFile(
            this.propuesta.id,
            propuestaFileId,
            this.propuestaTrabajoGradoFile
          )
          .subscribe({
            next: (propuesta) => {
              this.notifyService.open({
                clase: 'success',
                title: 'Proceso Exitoso',
                message:
                  'Se ha actualizado la Propuesta de Trabajo de Grado de manera exitosa',
              });
              this.close(true);
            },
            error: (error) => {
              this.notifyService.open({
                clase: 'alert',
                title: 'Error al actualizar el Archivo',
                message:
                  'Ha ocurrido un error al intentar actualizar la Propuesta de Trabajo de Grado',
              });
            },
          });

        break;
    }
  }

  /**
   * Recibe tipo de archivo y retorna el id del propuestaFile
   * @param tipo tipo del propuestaFile
   * @returns retorna el id del propuestaFile
   */
  getPropuestaFileId(tipo: TipoPropuestaFile): string {
    return (
      this.propuesta?.files.filter((file) => file.tipo === tipo)[0].id || ''
    );
  }

  /**
   * Cierra el modal
   */
  close(status: boolean = false) {
    this.activeModal.close(status);
  }
}
