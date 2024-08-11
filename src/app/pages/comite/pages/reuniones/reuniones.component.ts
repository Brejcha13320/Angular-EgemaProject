import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatus } from '@interfaces/request-status.interface';
import { Reunion } from '@interfaces/reunion.interface';
import { BehaviorSubject } from 'rxjs';
import { ComiteReunionService } from '../../services/comite-reunion.service';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrl: './reuniones.component.scss'
})
export class ReunionesComponent implements OnInit, OnDestroy {
  /**
   * Titulo de la sección
   */
  title: string = 'Reuniones del comite';
  /**
   * Mensaje de la sección
   */
  message: string = 'Esta sección te permite controlar las reuniones del comite'
  /**
   * Status de la peticion http de las propuestas
   */
  status: RequestStatus = 'init';
  /**
   * Data de las reuniones en un observable
   */
  dataTable$ = new BehaviorSubject<Reunion[]>([]);
  /**
   * Titulos de las columnas de la tabla
   */
  headersTable: string[] = ['ASUNTO', 'OPCIONES'];

  constructor(
    private router: Router,
    private comiteReunionService: ComiteReunionService
  ) { }

  /**
   * Llama el metodo getData para obtener la informacion
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Cuando finalice todo el ciclo de vida hace el unsubscribe de los
   * observables abiertos
   */
  ngOnDestroy(): void {
    this.dataTable$?.unsubscribe();
  }

  /**
   * Obtiene la informacion de las solicitudes de reuniones y el proceso va
   * actualizando el status para controlar los alert
   */
  getData() {
    this.status = 'loading';
    this.comiteReunionService.getReuniones().subscribe({
      next: (reunion) => {
        this.status = 'success';
        this.emitDataTable(reunion);
      },
      error: (error) => {
        this.status = 'error';
      },
    });
  }

  /**
   * Recibe el id del boton y del row y luego llama la funcion necesaria
   * dependiendo el case del boton seleccionado
   * @param idButton id del boton clickeado
   * @param idRow id de row en el cual se ha clickead un boton
   */
  clickEvents(idButton: string, idRow?: string) {
    switch (idButton) {
      case 'editar':
        if (idRow) {
          this.detalleReunion(idRow);
        }
        break;
    }
  }

  /**
   * Muestra el detalle de la reunion
   * @param idReunion id de la reunion seleccionada
   */
  detalleReunion(idReunion: string) {
    this.router.navigate(['/comite/reuniones/reunion', idReunion]);
  }

  /**
   * Recibe la data y hace next al observable
   * @param reuniones data que va ser emitida en el observable
   */
  emitDataTable(reuniones: Reunion[]) {
    this.dataTable$.next(reuniones);
  }

}
