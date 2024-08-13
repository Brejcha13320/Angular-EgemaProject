import { Component, OnDestroy, OnInit } from '@angular/core';
import { Propuesta } from '@interfaces/propuesta.interface';
import { RequestStatus } from '@interfaces/request-status.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ComitePropuestaService } from '../../services/comite-propuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrl: './propuestas.component.scss',
})
export class PropuestasComponent implements OnInit, OnDestroy {
  /**
   * Titulo de la sección
   */
  title: string = 'Propuestas de Trabajo de Grado';
  /**
   * Mensaje de la sección
   */
  message: string =
    'Esta sección te permite controlar los estados y hacer seguimiento a las propuestas de trabajo de grado. Obtén asistencia personalizada y asegúrate de avanzar de manera precisa en cada etapa de tu proyecto académico.';
  /**
   * Status de la peticion http de las propuestas
   */
  status: RequestStatus = 'init';
  /**
   * Data de las propuestas en un observable
   */
  dataTable$ = new BehaviorSubject<Propuesta[]>([]);
  /**
   * Titulos de las columnas de la tabla
   */
  headersTable: string[] = ['EMAIL', 'NOMBRE', 'ESTADO', 'CREADO', 'OPCIONES'];

  constructor(
    private router: Router,
    private comitePropuestaService: ComitePropuestaService
  ) {}

  /**
   * Llama el metodo getData para obtener la informacion
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Cuando finalize todo el ciclo de vida hace el unsubscribe de los
   * observables abiertos
   */
  ngOnDestroy(): void {
    this.dataTable$?.unsubscribe();
  }

  /**
   * Obtiene la informacion de las solicitudes de trabajo de grado y el proceso
   * va actualizando el status para controlar los alert
   */
  getData() {
    this.status = 'loading';
    this.comitePropuestaService.getPropuestas().subscribe({
      next: (propuestas) => {
        this.status = 'success';
        this.emitDataTable(propuestas);
      },
      error: (error) => {
        this.status = 'error';
      },
    });
  }

  /**
   * Recibe el id del boton y del row y luego llama la función necesaria
   * dependiento el case del boton seleccionado
   * @param idButton id del boton clickeado
   * @param idRow id de row en el cual se ha clickeado un boton
   */
  clickEvents(idButton: string, idRow?: string) {
    switch (idButton) {
      case 'editar':
        if (idRow) {
          this.detallePropuesta(idRow);
        }
        break;
    }
  }

  /**
   * Muestra el detalle de la propuesta
   * @param idPropuesta id de la propuesta seleccionada
   */
  detallePropuesta(idPropuesta: string) {
    this.router.navigate(['/comite/propuestas/propuesta', idPropuesta]);
  }

  /**
   * Recibe la data y hace next al observable
   * @param data data que va ser emitida en el observable
   */
  emitDataTable(propuestas: Propuesta[]) {
    this.dataTable$.next(propuestas);
  }
}
