import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { EstudianteInformeFinalService } from '../../services/estudiante-informe-final.service';
import { InformeFinal } from '@interfaces/informe-final.interface';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-modal-create-informe-final',
  templateUrl: './modal-create-informe-final.component.html',
  styleUrl: './modal-create-informe-final.component.scss',
})
export class ModalCreateInformeFinalComponent {
  /**
   * Id de la propuesta
   */
  @Input() propuestaId: string = '';
  /**
   * Id de la propuesta
   */
  @Input() informeFinalId: string | null = null;
  /**
   * Botones del footer create
   */
  buttonsCreate: ButtonModalFooter[] = [
    {
      idButton: 'crear-informe-final',
      text: 'Crear Informe Final',
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
      idButton: 'actualizar-informe-final',
      text: 'Actualizar Informe Final',
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
   * Listado de Usuarios para director y codirector
   */
  usuariosDirector: User[] = [];

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
    private estudianteInformeFinalService: EstudianteInformeFinalService
  ) {}

  /**
   * Llama la función para crear el formulario
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
      this.getUsersPrincipal();
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
    if (this.informeFinalId) {
      this.estudianteInformeFinalService
        .getInformeFinalById(this.informeFinalId)
        .subscribe({
          next: (informeFinal) => {
            this.createForm(informeFinal);
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
      this.createForm();
    }
  }

  /**
   * Obtiene el listado de usuarios para el director y codirector
   */
  getUsersPrincipal() {
    this.estudianteInformeFinalService.getUsuariosDirector().subscribe({
      next: (usuariosDirector) => {
        this.usuariosDirector = usuariosDirector;
      },
      error: (error) => {
        this.notifyService.open({
          title: 'Error al buscar los usuarios para director',
          message:
            'Ha ocurrido un error al buscar los usuarios para director y codirector',
          clase: 'alert',
        });
        this.close();
      },
    });
  }

  /**
   * Crea el formulario de la solicitud
   */
  createForm(informeFinal?: InformeFinal) {
    if (this.informeFinalId) {
      //Actualizar sin Files
      this.form = this.fb.group({
        directorId: ['', [Validators.required]],
        codirectorId: ['', [Validators.required]],
        conclusiones: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        trabajoFuturo: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
      });

      if (informeFinal) this.form.patchValue(informeFinal);
    } else {
      //Crear con Files
      this.form = this.fb.group({
        propuestaId: [this.propuestaId, Validators.required],
        directorId: ['', [Validators.required]],
        codirectorId: [''],
        conclusiones: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        trabajoFuturo: [
          '',
          [Validators.required, Validators.maxLength(this.limitText)],
        ],
        informeFinal: [null, Validators.required],
      });
    }
  }

  /**
   * Contro de todos los eventos de los clicks de botones
   * @param idButton id del boton seleccionado
   */
  clickEvents(idButton: String) {
    switch (idButton) {
      case 'crear-informe-final':
        this.createInformeFinal();
        break;
      case 'actualizar-informe-final':
        this.updateInformeFinal();
        break;
      case 'cancelar':
        this.close();
        break;
    }
  }

  /**
   * Se activa cuando le dan al boton de crear informe final
   */
  createInformeFinal() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
      return;
    }

    this.estudianteInformeFinalService
      .createInformeFinal(this.form.value)
      .subscribe({
        next: () => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'Se ha creado el informe final de manera exitosa',
          });
          this.close(true);
        },
        error: () => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Error al crear el informe final',
            message: 'Ha ocurrido un error al intentar crear el informe final',
          });
        },
      });
  }

  /**
   * Se activa cuando le dan al boton de actualizar informe final
   */
  updateInformeFinal() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
      return;
    }

    if (!this.informeFinalId) return;

    this.estudianteInformeFinalService
      .updateInformeFinal(this.informeFinalId, this.form.value)
      .subscribe({
        next: () => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'Se ha actualizado el informe final de manera exitosa',
          });
          this.close(true);
        },
        error: () => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Error al actualizar el informe final',
            message:
              'Ha ocurrido un error al intentar actualizar el informe final',
          });
        },
      });
  }

  /**
   * Segun el evento change del input file, obtiene el archivo o lo agrega al formulario
   * @param e evento del file
   * @param control formulario donde se va guardar el file
   */
  changeFile(e: any, control: 'informeFinal') {
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
