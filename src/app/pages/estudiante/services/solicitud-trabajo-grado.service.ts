import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateSolicitudTrabajoGrado,
  SolicitudTrabajoGrado,
} from '@interfaces/solicitud-trabajo-grado.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudTrabajoGradoService {
  /**
   * constructor de la clase
   * @param http dependencia para hacer peticiones http
   */
  constructor(private http: HttpClient) {}

  /**
   * hace la petición para obtener las solicitudes de trabajo de grado del estudiante
   * @returns returna la solicitud de trabajo de grado
   */
  getSolicitudesTrabajoGrado(): Observable<SolicitudTrabajoGrado[]> {
    return this.http.get<SolicitudTrabajoGrado[]>(
      '/solicitud-trabajo-grado/estudiante'
    );
  }

  /**
   * Crea la solicitud de trabajo de grado
   * @param opcion opcion seleccionada por el estudiante para el tipo de solicitud
   * @returns retorna la solicitud de trabajo de grado creada
   */
  createSolicitudTrabajoGrado(
    opcion: CreateSolicitudTrabajoGrado
  ): Observable<SolicitudTrabajoGrado> {
    return this.http.post<SolicitudTrabajoGrado>(
      '/solicitud-trabajo-grado/estudiante',
      opcion
    );
  }
}
