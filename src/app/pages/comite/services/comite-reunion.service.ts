import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Reunion,
  Participante,
  ReunionFile,
} from '@interfaces/reunion.interface';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ComiteReunionService {
  constructor(private http: HttpClient) {}

  /**
   * Hace la peticion para obtener las reuniones del comite
   * @returns Retorna las reuniones
   */
  getReuniones(): Observable<Reunion[]> {
    return this.http.get<Reunion[]>('/comite/reunion');
  }

  /**
   * Hace la peticion para obtener una reunion de comite especifica
   * @param idReunion id de la reunion que desea ver
   * @returns retorna la reunion
   */
  getReunionById(idReunion: string): Observable<Reunion> {
    return this.http.get<Reunion>(`/comite/reunion/${idReunion}`);
  }

  /**
   * hace la petición para actualizar el estado de una reunion
   * @returns retorna la reunion
   */
  updateEstadoReunion(idReunion: string, data: any): Observable<Reunion> {
    return this.http.put<Reunion>(`/comite/reunion/${idReunion}`, data);
  }
}
