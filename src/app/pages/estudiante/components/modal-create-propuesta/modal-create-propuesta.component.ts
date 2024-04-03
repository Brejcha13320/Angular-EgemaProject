import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { CreatePropuesta, Propuesta } from '@interfaces/propuesta.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';

@Component({
  selector: 'app-modal-create-propuesta',
  templateUrl: './modal-create-propuesta.component.html',
  styleUrl: './modal-create-propuesta.component.scss',
})
export class ModalCreatePropuestaComponent implements OnInit {
  /**
   * Id de la solicitud de Trabajo de Grado
   */
  @Input() solicitudTrabajoGradoId: string = '';
  /**
   * Id de la propuesta
   */
  @Input() propuestaId: string | null = null;
  /**
   * Botones del footer create
   */
  buttonsCreate: ButtonModalFooter[] = [
    {
      idButton: 'crear-propuesta',
      text: 'Crear Propuesta',
      clase: 'success',
    },
    {
      idButton: 'cancelar',
      text: 'Cancelar',
      clase: 'danger',
    },
  ];
  /**
   * Botones del footer update
   */
  buttonsUpdate: ButtonModalFooter[] = [
    {
      idButton: 'actualizar-propuesta',
      text: 'Actualizar Propuesta',
      clase: 'success',
    },
    {
      idButton: 'cancelar',
      text: 'Cancelar',
      clase: 'danger',
    },
  ];
  /**
   * Formulario de la propuesta
   */
  form!: FormGroup;
  /**
   * Limite de los campos de textarea
   */
  limitText: number = 10000;
  /**
   * Limite de los campos de textarea
   */
  limitTitle: number = 1000;

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
   * Recibe el contro y retorna el value
   * @param control nombre del control del formulario
   * @returns string con el value de control
   */
  getFormFieldValue(control: string): string {
    return this.form.get(control)?.value || '';
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
            this.createForm(propuesta);
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
      this.createForm();
    }
  }

  /**
   * Crea el formulario de la solicitud
   */
  createForm(propuesta?: Propuesta) {
    if (this.propuestaId) {
      //Actualizar sin Files
      this.form = this.fb.group({
        titulo: [
          '',
          [Validators.required, Validators.maxLength(this.limitTitle)],
        ],
        lineaInvestigacion: ['', Validators.required],
        problema: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        objetivo: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        alcance: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        justificacion: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
      });

      if (propuesta) this.form.patchValue(propuesta);
    } else {
      //Crear con Files
      this.form = this.fb.group({
        solicitudTrabajoGradoId: [
          this.solicitudTrabajoGradoId,
          Validators.required,
        ],
        titulo: [
          '',
          [Validators.required, Validators.maxLength(this.limitTitle)],
        ],
        lineaInvestigacion: ['', Validators.required],
        problema: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        objetivo: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        alcance: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        justificacion: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        cartaAceptacionDirector: [null, Validators.required],
        propuestaTrabajoGrado: [null, Validators.required],
      });
    }
  }

  /**
   * Contro de todos los eventos de los clicks de botones
   * @param idButton id del boton seleccionado
   */
  clickEvents(idButton: String) {
    switch (idButton) {
      case 'crear-propuesta':
        this.createPropuesta();
        break;
      case 'actualizar-propuesta':
        this.updatePropuesta();
        break;
      case 'cancelar':
        this.close();
        break;
    }
  }

  /**
   * Se activa cuando le dan al boton de crear propuesta
   */
  createPropuesta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
      return;
    }

    this.estudiantePropuestaService
      .createPropuesta(this.form.value)
      .then(() => {
        this.notifyService.open({
          clase: 'success',
          title: 'Proceso Exitoso',
          message: 'Se ha creado la propuesta de manera exitosa',
        });
        this.close(true);
      })
      .catch(() => {
        this.notifyService.open({
          clase: 'alert',
          title: 'Error al crear la Propuesta',
          message: 'Ha ocurrido un error al intentar crear la propuesta',
        });
      });
  }

  /**
   * Se activa cuando le dan al boton de actualizar propuesta
   */
  updatePropuesta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
      return;
    }

    if (!this.propuestaId) return;

    this.estudiantePropuestaService
      .updatePropuesta(this.propuestaId, this.form.value)
      .subscribe({
        next: (propuesta) => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'Se ha creado la propuesta de manera exitosa',
          });
          this.close(true);
        },
        error: (error) => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Error al actualizar la Propuesta',
            message: 'Ha ocurrido un error al intentar actualizar la propuesta',
          });
        },
      });
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
    if (file) {
      this.form.get(control)?.setValue(file);
    } else {
      this.form.get(control)?.setValue(null);
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
   * Cierra el modal
   */
  close(status: boolean = false) {
    this.activeModal.close(status);
  }
}
