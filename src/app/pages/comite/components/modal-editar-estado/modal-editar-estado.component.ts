import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { ComiteInformeFinalService } from '../../services/comite-informe-final.service';
import { InformeFinal } from '@interfaces/informe-final.interface';

@Component({
  selector: 'app-modal-editar-estado',
  templateUrl: './modal-editar-estado.component.html',
  styleUrl: './modal-editar-estado.component.scss',
})
export class ModalEditarEstadoComponent implements OnInit {
  /**
   * Id del informe final
   */
  @Input({ required: true }) informeFinalId: string = '';
  /**
   * Titulo del modal
   */
  title: string = 'Actualizar el Estado del Informe Final';
  /**
   * Botones del footer
   */
  buttons: ButtonModalFooter[] = [
    {
      idButton: 'actualizar-estado',
      text: 'Actualizar Estado',
      clase: 'success',
    },
    {
      idButton: 'cancelar',
      text: 'Cancelar',
      clase: 'danger',
    },
  ];
  /**
   * Informe Final
   */
  informeFinal: InformeFinal | null = null;
  /**
   * Formulario de la solicitud
   */
  form!: FormGroup;

  /**
   * Constructor de la clase
   * @param fb dependecia para formularios
   * @param activeModal servcio para controlar el modal
   * @param notifyService servicio de notificaciones
   */
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private notifyService: NotifyService,
    private comiteInformeFinalService: ComiteInformeFinalService
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
   * Obtiene el informe final
   */
  getData() {
    this.comiteInformeFinalService
      .getInformeFinalById(this.informeFinalId)
      .subscribe({
        next: (informeFinal) => {
          this.informeFinal = informeFinal;
          this.createForm();
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
   * Crea el formulario para editar el estado
   */
  createForm() {
    this.form = this.fb.group({
      estado: [this.informeFinal?.estado, Validators.required],
    });
  }

  /**
   * Contro de todos los eventos de los clicks de botones
   * @param idButton id del boton seleccionado
   */
  clickEvents(idButton: String) {
    switch (idButton) {
      case 'actualizar-estado':
        this.updateEstado();
        break;
      case 'cancelar':
        this.close();
        break;
    }
  }

  /**
   * Valida si un control del formulario es valido
   * @param ctrName nombre del control del formulario
   * @returns retorna si no ha sido tocado o tiene errores
   */
  isInvalid(ctrName: string) {
    const control = this.form.get(ctrName);
    return control?.touched && control?.errors;
  }

  /**
   * Valida si un control del formulario es valido
   * @param ctrName nombre del control del formulario
   * @returns retorna si no ha sido tocado o es valido
   */
  isValid(ctrName: string) {
    const control = this.form.get(ctrName);
    return control?.touched && control?.valid;
  }

  /**
   * Actualiza el estado del informe final
   */
  updateEstado() {
    this.comiteInformeFinalService
      .updateEstadoInformeFinal(this.informeFinalId, this.form.value)
      .subscribe({
        next: (jurados) => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message:
              'Se actualizo el estado del informe final de manera exitosa',
          });
          this.close(true);
        },
        error: (error) => {
          this.notifyService.open({
            title: 'Error al actualizar el estado',
            message: 'Ha ocurrido un error al intertar actualizar el estado',
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
