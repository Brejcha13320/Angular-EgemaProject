import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reunion } from '@interfaces/reunion.interface';
import { NotifyService } from '@shared-services/notify.service';
import { ComiteReunionService } from '../../services/comite-reunion.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-reunion',
  templateUrl: './detalle-reunion.component.html',
  styleUrl: './detalle-reunion.component.scss'
})
export class DetalleReunionComponent implements OnInit {
  /**
   * Titulo de la sección
   */
  title: string = 'Detalle de la reunion';
  /**
   * Mensaje de la sección
   */
  message: string =
    'A continuación, te proporcionamos una descripción detallada de la reunión en cuestión. Este análisis exhaustivo busca brindarte una visión completa de los elementos clave y consideraciones asociadas con esta reunión específica.';
  /**
   * Titulo de la alerta si no encuentra la reunión
   */
  titleNotReunion = 'No existe la reunion';
  /**
   * Mensaje de alerta si no encuentr la reunion
   */
  textNotReunion =
    'No existe la reunion del comite que esta intentado buscar';
  /**
   * Reunion
   */
  reunion: Reunion | null = null;
  /**
   * Nombre del boton de redirect
   */
  nameRedirect: string = 'Volver al listado de Reuniones';
  /**
   * Formulario para el estado de la reunion
   */
  form!: FormGroup;
  /**
   * Limite de los campos de textarea
   */
  limitText: number = 10000;

  /**
   *
   * @param router se usa para realizar la navegacion del usuario
   * @param activatedRoute se usa para obtener parametros de la url
   * @param comiteReunionService servicio de reunion del comite
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService,
    private comiteReunionService: ComiteReunionService
  ) { }

  /**
  * Obtiene el parametro id de la url, consulta la reunion
  * segun el id y crea el formControl del estado
  */
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.comiteReunionService.getReunionById(id);
        })
      )
      .subscribe((reunion) => {
        this.reunion = reunion;
        this.createForm();
      });
  }

  /**
   * Recibe el control y retorna el value
   * @param control nombre del control del formulario
   * @returns string con el value de control
   */
  getFormFieldValue(control: string): string {
    return this.form.get(control)?.value || '';
  }

  /**
   * Crea el control de la reunion y agrega el estado actual
   * @param estado estado de la reunion
   */
  createForm() {
    this.form = this.fb.group({

    });
  }

  /**
   * Actualiza el estado de la reunion
   */
  // updateReunion() {
  //   if (!this.reunion) return;
  //   this.comiteReunionService
  //     .updateEstadoReunion(this.reunion, this.form.value)
  //     .subscribe({
  //       next: (reunion) => {
  //         this.reunion = reunion;
  //         this.notifyService.open({
  //           clase: 'success',
  //           title: 'Proceso Exitoso',
  //           message: 'La propuesta se actualizo correctamente',
  //         });
  //       },
  //       error: (error) => {
  //         this.notifyService.open({
  //           clase: 'alert',
  //           title: 'Ha Ocurrido un Problema',
  //           message: 'Ha ocurrido un error al actualizar la reunion',
  //         });
  //       },
  //     });
  // }

  /**
   * Redirecciona al comite a las reuniones
   */
  redirect() {
    this.router.navigateByUrl('comite/reuniones');
  }

}
