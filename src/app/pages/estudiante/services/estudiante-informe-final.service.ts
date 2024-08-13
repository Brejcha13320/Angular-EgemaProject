import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import {
  CreateInformeFinal,
  InformeFinal,
  UpdateInformeFinal,
} from '@interfaces/informe-final.interface';
import { User } from '@interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudianteInformeFinalService {
  constructor(private http: HttpClient, private authService: AuthService) {}

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

  createInformeFinal(data: CreateInformeFinal) {
    const userId = this.authService.getUser()?.id;

    const body = new FormData();
    body.append('userId', userId ?? '');
    body.append('codirectorId', data.codirectorId);
    body.append('directorId', data.directorId);
    body.append('conclusiones', data.conclusiones);
    body.append('trabajoFuturo', data.trabajoFuturo);
    body.append('informeFinal', data.informeFinal);

    return this.http.post<InformeFinal>(`/informe-final/estudiante`, body);
  }

  updateInformeFinal(informeFinalId: string, data: UpdateInformeFinal) {
    return this.http.put<InformeFinal>(
      `/informe-final/estudiante/${informeFinalId}`,
      data
    );
  }

  /**
   * Recibe el id del informeFinalFile, File y Tipo para actualizar el file
   * @param id id de la informeFinalFile
   * @param file archivo seleccionado por el usuario
   * @param tipo tipo de archivo el informeFinalFile
   * @returns retorna la informeFinal actualizada con los files
   */
  updateInformeFinalFile(
    id: string,
    informeFinalFileId: string,
    file: any
  ): Observable<InformeFinal> {
    const body = new FormData();
    body.append('informeFinalFileId', informeFinalFileId);
    body.append('file', file);
    return this.http.put<InformeFinal>(
      `/informe-final/estudiante/file/${id}`,
      body
    );
  }

  /**
   * Recibe el id de la informe final con la data nueva y actualiza la informe final
   * @param id id de la informe final
   * @param data data de la informe final actualizada
   * @returns retorna la informe final actualizada
   */
  updateInformeFinalPendiente(id: string, data: { estado: 'PENDIENTE' }) {
    return this.http.put<InformeFinal>(
      `/informe-final/estudiante/pendiente/${id}`,
      data
    );
  }
}
