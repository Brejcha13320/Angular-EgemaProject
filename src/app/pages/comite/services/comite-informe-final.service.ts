import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EstadoInformeFinal,
  InformeFinal,
  Jurado,
  UpdateEstadoInformeFinal,
  UpdateJuradosInformeFinal,
} from '@interfaces/informe-final.interface';
import { User } from '@interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComiteInformeFinalService {
  constructor(private http: HttpClient) {}

  /**
   * hace la petición para obtener los informes finales del estudiante
   * @returns returna el informe final
   */
  getInformesFinales(): Observable<InformeFinal[]> {
    return this.http.get<InformeFinal[]>('/informe-final/comite');
  }

  /**
   * hace la petición para obtener un informe final del estudiante
   * @returns returna el informe final
   */
  getInformeFinalById(informeFinalId: string): Observable<InformeFinal> {
    return this.http.get<InformeFinal>(
      `/informe-final/comite/${informeFinalId}`
    );
  }

  /**
   * hace la petición para actualizar el estado del informe final
   * @returns returna la propuesta
   */
  updateEstadoInformeFinal(
    idInformeFinal: string,
    data: UpdateEstadoInformeFinal
  ): Observable<InformeFinal> {
    return this.http.put<InformeFinal>(
      `/informe-final/comite/estado/${idInformeFinal}`,
      data
    );
  }

  /**
   * Recibe el id del informe final y retorna los jurados
   * @param informeFinalId id del informe final
   * @returns los jurados de un informe final
   */
  getJuradosByInformeFinal(informeFinalId: string): Observable<Jurado[]> {
    return this.http.get<Jurado[]>(
      `/informe-final/comite/jurado/${informeFinalId}`
    );
  }

  /**
   * Hace la peticion para obtener los jurados disponibles
   * @returns retorna los usuarios para ser jurados
   */
  getUsuariosJurado(): Observable<User[]> {
    return this.http.get<User[]>(`/informe-final/comite/usuarios/jurado`);
  }

  /**
   * Recibe el id del informe final con los jurados y los crea
   * @param informeFinalId id del informe final
   * @param data jurados
   * @returns los jurados del informe final
   */
  createJuradosInformeFinal(
    data: UpdateJuradosInformeFinal[]
  ): Observable<InformeFinal> {
    return this.http.post<InformeFinal>(`/informe-final/comite/jurado`, data);
  }
}
