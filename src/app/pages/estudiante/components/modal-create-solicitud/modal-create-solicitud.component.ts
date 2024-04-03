import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { OpcionSolicitudTrabajoGrado } from '@interfaces/solicitud-trabajo-grado.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';

@Component({
  selector: 'app-modal-create-solicitud',
  templateUrl: './modal-create-solicitud.component.html',
  styleUrl: './modal-create-solicitud.component.scss',
})
export class ModalCreateSolicitudComponent implements OnInit {
  /**
   * Titulo del modal
   */
  title: string = 'Crear Solicitud de Trabajo de Grado';
  /**
   * Botones del footer
   */
  buttons: ButtonModalFooter[] = [
    {
      idButton: 'crear-solicitud',
      text: 'Crear Solicitud',
      clase: 'success',
    },
    {
      idButton: 'cancelar',
      text: 'Cancelar',
      clase: 'danger',
    },
  ];
  /**
   * Formulario de la solicitud
   */
  form!: FormGroup;
  /**
   * Returna el valor de la opción del formulario
   */
  get opcion(): string {
    return this.form.value.opcion || '';
  }

  /**
   * Constructor de la clase
   * @param fb dependecia para formularios
   * @param activeModal servcio para controlar el modal
   * @param notifyService servicio de notificaciones
   */
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private notifyService: NotifyService
  ) {}

  /**
   * Llama la función para crear el formulario
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Crea el formulario de la solicitud
   */
  createForm() {
    this.form = this.fb.group({
      opcion: ['', Validators.required],
    });
  }

  /**
   * Contro de todos los eventos de los clicks de botones
   * @param idButton id del boton seleccionado
   */
  clickEvents(idButton: String) {
    switch (idButton) {
      case 'crear-solicitud':
        this.createSolicitud();
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
   * Se activa cuando le dan al boton de crear solicitud
   */
  createSolicitud() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
    }

    this.close(this.form.value);
  }

  /**
   * Hace un switch segun la opcion seleccionada y retorna un titulo
   * para cada opción
   * @param opcion opcion seleccionada en el formulario
   * @returns return un string con el titulo del alert segun la opción
   */
  getTitle(opcion: OpcionSolicitudTrabajoGrado): string {
    let title = '';
    switch (opcion) {
      case 'TRABAJO_GRADO':
        title = '¡Mensaje Importante!';
        break;
      case 'INVESTIGACION':
        break;
      case 'ESPECIALIZACION':
        break;
      case 'PRUEBAS_SABER_PRO':
        break;
    }
    return title;
  }

  /**
   * Hace un switch segun la opcion seleccionada y retorna un texto
   * para cada opción
   * @param opcion opcion seleccionada en el formulario
   * @returns return un string con el texto del alert segun la opción
   */
  getText(opcion: OpcionSolicitudTrabajoGrado): string {
    let text = '';
    switch (opcion) {
      case 'TRABAJO_GRADO':
        text =
          'Recuerda que para avanzar con tu propuesta de trabajo de grado, es imprescindible conseguir un director de trabajo y obtener la carta de aceptación. Una vez aceptada, dispones de 6 meses para completar y enviar tu trabajo. Ten presente que solo cuentas con la posibilidad de un máximo de 4 meses de aplazamiento. ¡Prioriza tu tiempo y avanza con determinación hacia tu objetivo académico!';
        break;
      case 'INVESTIGACION':
        break;
      case 'ESPECIALIZACION':
        break;
      case 'PRUEBAS_SABER_PRO':
        break;
    }
    return text;
  }

  /**
   * Cierra el modal
   */
  close(formValue?: { opcion: OpcionSolicitudTrabajoGrado }) {
    this.activeModal.close(formValue ?? null);
  }
}
