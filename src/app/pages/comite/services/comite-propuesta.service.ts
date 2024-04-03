import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Propuesta,
  UpdateEstadoPropuesta,
} from '@interfaces/propuesta.interface';

@Injectable({
  providedIn: 'root',
})
export class ComitePropuestaService {
  constructor(private http: HttpClient) {}

  /**
   * hace la petición para obtener las propuestas del estudiante
   * @returns returna la propuesta
   */
  getPropuestas(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>('/propuesta/comite');
  }

  /**
   * hace la petición para obtener una propuestas del estudiante
   * @returns returna la propuesta
   */
  getPropuestaById(idPropuesta: string): Observable<Propuesta> {
    return this.http.get<Propuesta>(`/propuesta/comite/${idPropuesta}`);
  }

  /**
   * hace la petición para actualizar el estado de una propuesta
   * @returns returna la propuesta
   */
  updateEstadoPropuesta(
    idPropuesta: string,
    data: UpdateEstadoPropuesta
  ): Observable<Propuesta> {
    return this.http.put<Propuesta>(`/propuesta/comite/${idPropuesta}`, data);
  }
}
