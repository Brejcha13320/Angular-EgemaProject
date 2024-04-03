import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EstadoPropuesta,
  Propuesta,
  UpdateEstadoPropuesta,
} from '@interfaces/propuesta.interface';
import { ComitePropuestaService } from '../../services/comite-propuesta.service';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from '@shared-services/notify.service';

@Component({
  selector: 'app-detalle-propuesta',
  templateUrl: './detalle-propuesta.component.html',
  styleUrl: './detalle-propuesta.component.scss',
})
export class DetallePropuestaComponent implements OnInit {
  /**
   * Titulo de la sección
   */
  title: string = 'Detalle de Propuesta';
  /**
   * Mensaje de la sección
   */
  message: string =
    'A continuación, te proporcionamos una descripción detallada de la propuesta en cuestión. Este análisis exhaustivo busca brindarte una visión completa de los elementos clave y consideraciones asociadas con esta propuesta específica.';
  /**
   * Titulo de la alerta si no cuentra la propuesta
   */
  titleNotPropuesta = 'No existe la Propuesta';
  /**
   * Mensaje de la alerta si no cuentra la propuesta
   */
  textNotPropuesta =
    'No existe la propuesta de trabajo de grado que estas intentando buscar';
  /**
   * Propuesta
   */
  propuesta: Propuesta | null = null;
  /**
   * Nombre del boton de redirect
   */
  nameRedirect: string = 'Volver al Listado de Propuestas';
  /**
   * Formulario para el estado de la propuesta
   */
  form!: FormGroup;
  /**
   * Limite de los campos de textarea
   */
  limitText: number = 10000;

  /**
   *
   * @param router se usa para realizar la navegacion del usuario
   * @param activatedRoute se usa para optener parametros de la url
   * @param comitePropuestaService servicio de propuestas del comite
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService,
    private comitePropuestaService: ComitePropuestaService
  ) {}

  /**
   * Obtiene el parametro id de la url, consulta la propuesta
   * segun el id y crea el formControl del estado
   */
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.comitePropuestaService.getPropuestaById(id);
        })
      )
      .subscribe((propuesta) => {
        this.propuesta = propuesta;
        this.createForm({
          estado: this.propuesta.estado,
          comentarios: this.propuesta.comentarios,
        });
      });
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
   * Crea el control de la propuesta y agrega el estado actual
   * @param estado estado de la propuesta
   */
  createForm(data: UpdateEstadoPropuesta) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      comentarios: ['', Validators.maxLength(this.limitText)],
    });

    this.form.patchValue(data);
  }

  /**
   * Actualiza el estado de la propuesta
   */
  updatePropuesta() {
    if (!this.propuesta) return;
    this.comitePropuestaService
      .updateEstadoPropuesta(this.propuesta.id, this.form.value)
      .subscribe({
        next: (propuesta) => {
          this.propuesta = propuesta;
          this.notifyService.open({
            clase: 'success',
            title: 'Proceso Exitoso',
            message: 'La propuesta se actualizo correctamente',
          });
        },
        error: (error) => {
          this.notifyService.open({
            clase: 'alert',
            title: 'Ha Ocurrido un Problema',
            message: 'Ha ocurrido un error al actualizar la propuesta',
          });
        },
      });
  }

  /**
   * Redirecciona al comite a las propuestas
   */
  redirect() {
    this.router.navigateByUrl('comite/propuestas');
  }
}
