import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InformeFinal,
  UpdateEstadoInformeFinal,
} from '@interfaces/informe-final.interface';
import { NotifyService } from '@shared-services/notify.service';
import { ComiteInformeFinalService } from '../../services/comite-informe-final.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-informe-final',
  templateUrl: './detalle-informe-final.component.html',
  styleUrl: './detalle-informe-final.component.scss',
})
export class DetalleInformeFinalComponent {
  /**
   * Titulo de la sección
   */
  title: string = 'Detalle del Informe Final';
  /**
   * Mensaje de la sección
   */
  message: string =
    'A continuación, te proporcionamos una descripción detallada de la propuesta en cuestión. Este análisis exhaustivo busca brindarte una visión completa de los elementos clave y consideraciones asociadas con esta propuesta específica.';
  /**
   * Titulo de la alerta si no cuentra del informe final
   */
  titleNotInformeFinal = 'No existe el Informe Final';
  /**
   * Mensaje de la alerta si no encuentra del informe final
   */
  textNotInformeFinal =
    'No existe el Informe Final de trabajo de grado que estas intentando buscar';
  /**
   * Informe Final
   */
  informeFinal: InformeFinal | null = null;
  /**
   * Nombre del boton de redirect
   */
  nameRedirect: string = 'Volver al Listado de Informe Final';

  /**
   *
   * @param router se usa para realizar la navegacion del usuario
   * @param activatedRoute se usa para optener parametros de la url
   * @param comiteInformeFinalService servicio de informe final del comite
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comiteInformeFinalService: ComiteInformeFinalService
  ) {}

  /**
   * Obtiene el parametro id de la url, consulta del informe final
   * segun el id y crea el formControl del estado
   */
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.comiteInformeFinalService.getInformeFinalById(id);
        })
      )
      .subscribe((informeFinal) => {
        this.informeFinal = informeFinal;
      });
  }

  /**
   * Redirecciona al comite a las propuestas
   */
  redirect() {
    this.router.navigateByUrl('comite/informes-finales');
  }
}
