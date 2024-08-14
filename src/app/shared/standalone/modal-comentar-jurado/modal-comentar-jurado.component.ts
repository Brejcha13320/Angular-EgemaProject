import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformeFinal, Jurado } from '@interfaces/informe-final.interface';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JuradoService } from '@shared-services/jurado.service';
import { NotifyService } from '@shared-services/notify.service';
import { ModalFooterComponent } from '@standalone/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from '@standalone/modal-header/modal-header.component';

@Component({
  selector: 'app-modal-comentar-jurado',
  standalone: true,
  imports: [
    CommonModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-comentar-jurado.component.html',
  styleUrl: './modal-comentar-jurado.component.scss',
})
export class ModalComentarJuradoComponent implements OnInit {
  /**
   * id del informe final
   */
  @Input({ required: true }) juradoId: string = '';

  /**
   * Informe Final
   */
  jurado: Jurado | null = null;
  /**
   * formulario
   */
  form!: FormGroup;
  /**
   * Limite de los campos de textarea
   */
  limitText: number = 1000;
  /**
   * Botones del footer create
   */
  buttons: ButtonModalFooter[] = [
    {
      idButton: 'guardar',
      text: 'Guardar Comentarios',
      clase: 'success',
    },
    {
      idButton: 'cancelar',
      text: 'Cancelar',
      clase: 'danger',
    },
  ];

  constructor(
    private fb: FormBuilder,
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
    this.juradoService.getJuradoById(this.juradoId).subscribe({
      next: (jurado) => {
        this.jurado = jurado;
        this.createForm(jurado.comentario);
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

  createForm(comentario: string) {
    this.form = this.fb.group({
      comentario: [comentario || ''],
    });
  }

  /**
   * Contro de todos los eventos de los clicks de botones
   * @param idButton id del boton seleccionado
   */
  clickEvents(idButton: String) {
    switch (idButton) {
      case 'guardar':
        this.guardarComentarios();
        break;
      case 'cancelar':
        this.close();
        break;
    }
  }

  /**
   * Recibe el contro y retorna el value
   * @param control nombre del control del formulario
   * @returns string con el value de control
   */
  getFormFieldValue(control: string): string {
    return this.form.get(control)?.value || '';
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

  guardarComentarios() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
      return;
    }

    this.juradoService
      .updateComentarioJurado(this.juradoId, this.form.value)
      .subscribe({
        next: () => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'Se ha actualizado el comentario de manera exitosa',
          });
          this.close(true);
        },
        error: () => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Error al actualizar el comentario',
            message:
              'Ha ocurrido un error al intentar actualizar el comentario',
          });
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
