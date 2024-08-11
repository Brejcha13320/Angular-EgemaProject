import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformeFinal } from '@interfaces/informe-final.interface';
import { User } from '@interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudianteInformeFinalService {
  constructor(private http: HttpClient) {}

  /**
   * hace la petición para obtener las propuestas del estudiante
   * @returns returna la propuesta
   */
  getInformesFinales(): Observable<InformeFinal[]> {
    return this.http.get<InformeFinal[]>('/informe-final/estudiante');
  }

  /**
   * hace la petición para obtener la propuesta segun el id
   * @returns returna la propuesta
   */
  getInformeFinalById(id: string): Observable<InformeFinal> {
    return this.http.get<InformeFinal>(`/informe-final/estudiante/${id}`);
  }

  /**
   * Consulta los usuarios disponibles para director y codirector
   * @returns retorna una arreglo de usuarios
   */
  getUsuariosDirector(): Observable<User[]> {
    return this.http.get<User[]>(`/informe-final/estudiante/usuarios/director`);
  }
}
