import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EstadoInformeFinal,
  InformeFinal,
} from '@interfaces/informe-final.interface';
import { EstudianteInformeFinalService } from '../../services/estudiante-informe-final.service';
import { switchMap } from 'rxjs';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { TokenService } from '@auth-services/token.service';
import { environment } from '@environments/environment';
import { RolUser } from '@interfaces/user.interface';

@Component({
  templateUrl: './detalle-informe-final.component.html',
  styleUrl: './detalle-informe-final.component.scss',
})
export class DetalleInformeFinalComponent implements OnInit {
  /**
   * Titulo de la sección
   */
  title: string = 'Detalle de Informe Final';
  /**
   * Mensaje de la sección
   */
  message: string =
    'A continuación, te proporcionamos una descripción detallada de la propuesta en cuestión. Este análisis exhaustivo busca brindarte una visión completa de los elementos clave y consideraciones asociadas con esta propuesta específica.';
  /**
   * Titulo de la alerta si no cuentra la informe final
   */
  titleNotInformeFinal = 'No existe el Informe Final';
  /**
   * Mensaje de la alerta si no cuentra la informe final
   */
  textNotInformeFinal =
    'No existe el informe final de trabajo de grado que estas intentando buscar';
  /**
   * Informe Final
   */
  informeFinal: InformeFinal | null = null;
  /**
   * Nombre del boton de redirect
   */
  nameRedirect: string = 'Volver a mi Trabajo de Grado';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private estudianteInformeFinalService: EstudianteInformeFinalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.estudianteInformeFinalService.getInformeFinalById(id);
        })
      )
      .subscribe((informeFinal) => {
        this.informeFinal = informeFinal;
      });
  }

  /**
   * Redirecciona al estudiante al trabajo de grado
   */
  redirect() {
    this.router.navigateByUrl('estudiante/trabajo-grado');
  }
}
