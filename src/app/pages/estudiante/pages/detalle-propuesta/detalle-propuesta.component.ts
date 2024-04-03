import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantePropuestaService } from '../../services/estudiante-propuesta.service';
import { switchMap } from 'rxjs';
import { Propuesta } from '@interfaces/propuesta.interface';

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
  nameRedirect: string = 'Volver a mi Trabajo de Grado';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private estudiantePropuestaService: EstudiantePropuestaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.estudiantePropuestaService.getPropuestaById(id);
        })
      )
      .subscribe((propuesta) => {
        this.propuesta = propuesta;
      });
  }

  /**
   * Redirecciona al estudiante al trabajo de grado
   */
  redirect() {
    this.router.navigateByUrl('estudiante/trabajo-grado');
  }
}
