import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonModalFooter } from '@interfaces/modal.inteface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '@shared-services/notify.service';
import { ComiteInformeFinalService } from '../../services/comite-informe-final.service';
import { Jurado } from '@interfaces/informe-final.interface';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-modal-asignar-jurados',
  templateUrl: './modal-asignar-jurados.component.html',
  styleUrl: './modal-asignar-jurados.component.scss',
})
export class ModalAsignarJuradosComponent implements OnInit {
  /**
   * Id del informe final
   */
  @Input({ required: true }) informeFinalId: string = '';
  /**
   * Headers de la tabla
   */
  headersTable: string[] = ['JURADO', 'OPCIONES'];
  /**
   * Botones del footer
   */
  buttons: ButtonModalFooter[] = [
    {
      idButton: 'asignar-jurados',
      text: 'Asignar Jurados',
      clase: 'success',
    },
    {
      idButton: 'cancelar',
      text: 'Cancelar',
      clase: 'danger',
    },
  ];
  /**
   * Jurados
   */
  jurados: Jurado[] = [];
  /**
   * Usuarios Jurados
   */
  usuariosJurados: User[] = [];
  /**
   * Arreglo del formulario para el Jurado
   */
  formJurados!: FormArray;

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
      this.getUsuariosJurados();
    }, 200);
  }

  /**
   * Obtiene la data si existe el id de la propuesta sino crear el formulario vacio
   */
  getData() {
    this.comiteInformeFinalService
      .getJuradosByInformeFinal(this.informeFinalId)
      .subscribe({
        next: (jurados) => {
          this.jurados = jurados;
          this.createForm();
        },
        error: (error) => {
          this.notifyService.open({
            title: 'Error al buscar los jurados',
            message: 'Ha ocurrido un error al buscar los jurados',
            clase: 'alert',
          });
          this.close();
        },
      });
  }

  getUsuariosJurados() {
    this.comiteInformeFinalService.getUsuariosJurado().subscribe({
      next: (usuariosJurados) => {
        this.usuariosJurados = usuariosJurados;
      },
      error: (error) => {
        this.notifyService.open({
          title: 'Error al buscar los jurados disponibles',
          message: 'Ha ocurrido un error al buscar los jurados disponibles',
          clase: 'alert',
        });
        this.close();
      },
    });
  }

  /**
   * Crear el formulario
   */
  createForm() {
    this.formJurados = this.fb.array([]);
    this.populateData();
  }

  /**
   * Agrega filas al formulario y hace patch con la data
   */
  populateData() {
    this.onAdd(this.jurados.length);
    this.formJurados.patchValue(this.jurados);
  }

  /**
   * Agrega formGroup segun el numero de filas
   * @param tableRows numero de filas
   */
  onAdd(tableRows: number) {
    for (let i = 0; i < tableRows; i++) {
      this.formJurados.push(this.addControls());
    }
  }

  /**
   * Elimina un formGroup del FormArray
   * @param i index del formulario
   */
  onRemove(i: number) {
    this.formJurados.removeAt(i);
  }

  /**
   * Agrega controls al formulario
   * @returns retorna el formulario con los controls
   */
  addControls() {
    return new FormGroup({
      userId: new FormControl('', [Validators.required]),
      informeFinalId: new FormControl(this.informeFinalId, [
        Validators.required,
      ]),
    });
  }

  /**
   * Recibe un indice i y retorna el el formGroup correspondiente en el formArray segun el indice
   * @param i indice para retornar el numero del formulario
   * @returns retorna un formGroup segun el indice
   */
  getJuradosFormGroup(i: number) {
    return this.formJurados.get([i]) as FormGroup;
  }

  /**
   * Valida si un control dentro de un FormArray es invalido o no
   * Si es invalido, regresa true caso contrario false
   * @param ctrName Nombre del control que se quiere validar si tiene error
   * @param index Posición del formgroup dentro del formArray
   */
  isInvalid(ctrName: string, index: number): ValidationErrors {
    const control = this.formJurados.get([index])?.get(ctrName);
    return (control?.touched && control?.errors) as ValidationErrors;
  }

  /**
   * Valida si un control del formulario es valido
   * @param ctrName nombre del control del formulario
   * @param index Posición del formgroup dentro del formArray
   * @returns retorna si no ha sido tocado o es valido
   */
  isValid(ctrName: string, index: number) {
    const control = this.formJurados.get([index])?.get(ctrName);
    return control?.touched && control?.valid;
  }

  addJurado() {
    if (this.formJurados.controls.length === 3) {
      this.notifyService.open({
        title: 'No puedes agregar mas jurados',
        message: 'Solo puedes tener un maximo de 3 jurados',
        clase: 'alert',
      });
    } else {
      this.onAdd(1);
    }
  }

  /**
   * Contro de todos los eventos de los clicks de botones
   * @param idButton id del boton seleccionado
   */
  clickEvents(idButton: String) {
    switch (idButton) {
      case 'asignar-jurados':
        this.asignarJurados();
        break;
      case 'cancelar':
        this.close();
        break;
    }
  }

  /**
   * Asigna los jurados
   * @returns retorna null si el formulario no es correcto
   */
  asignarJurados() {
    if (!this.validForm()) return;
    if (!this.validateRepeatIds()) return;

    this.comiteInformeFinalService
      .createJuradosInformeFinal(this.formJurados.value)
      .subscribe({
        next: (jurados) => {
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'Se han asignado los jurados de manera exitosa',
          });
          this.close(true);
        },
        error: (error) => {
          this.notifyService.open({
            title: 'Error al asignar los jurados',
            message: 'Ha ocurrido un error al asignar los jurados',
            clase: 'alert',
          });
          this.close();
        },
      });
  }

  /**
   * Valida si los jurados seleccionados estan repetidos
   * @returns Booleano segun la comparacion de arreglos
   */
  validateRepeatIds() {
    let arrayIds: string[] = [];

    this.formJurados.value.forEach(
      (item: { userId: string; informeFinalId: string }) => {
        arrayIds.push(item.userId);
      }
    );

    let arrayIdsUnit = new Set(arrayIds);

    if (arrayIds.length !== arrayIdsUnit.size) {
      this.notifyService.open({
        title: 'Error al asignar los jurados',
        message: 'No puede tener jurados repetidos',
        clase: 'alert',
      });
      return false;
    }

    return true;
  }

  /**
   * Valida si el formulario esta bien o no y retorna un booleano
   * @returns return un booleando segun el estado del formulario
   */
  validForm() {
    if (this.formJurados.invalid) {
      this.formJurados.markAllAsTouched();
      this.notifyService.open({
        title: 'Formulario No Valido',
        message: 'Revise su formulario por favor',
        clase: 'alert',
      });
      return false;
    }

    return true;
  }

  /**
   * Cierra el modal
   */
  close(status: boolean = false) {
    this.activeModal.close(status);
  }
}
