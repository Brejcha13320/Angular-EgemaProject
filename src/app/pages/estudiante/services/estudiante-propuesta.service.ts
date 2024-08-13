import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import { TokenService } from '@auth-services/token.service';
import { environment } from '@environments/environment';
import {
  CreatePropuesta,
  Propuesta,
  TipoPropuestaFile,
  UpdatePropuestaEstudiante,
} from '@interfaces/propuesta.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantePropuestaService {
  /**
   * constructor de la clase
   * @param http dependencia para hacer peticiones http
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * hace la petición para obtener las propuestas del estudiante
   * @returns returna la propuesta
   */
  getPropuestas(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>('/propuesta/estudiante');
  }

  /**
   * hace la petición para obtener las propuestas del estudiante
   * @returns returna la propuesta
   */
  getPropuestasAprobadas(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>('/propuesta/estudiante/aprobada');
  }

  /**
   * hace la petición para obtener la propuesta segun el id
   * @returns returna la propuesta
   */
  getPropuestaById(id: string): Observable<Propuesta> {
    return this.http.get<Propuesta>(`/propuesta/estudiante/${id}`);
  }

  /**
   * Recibe la data y crea la propuesta
   * @param data data para crear la propuesta
   * @returns returna una promesa con la propuesta creada
   */
  createPropuesta(data: CreatePropuesta): Observable<Propuesta> {
    const userId = this.authService.getUser()?.id;

    const body = new FormData();

    body.append('titulo', data.titulo);
    body.append('lineaInvestigacion', data.lineaInvestigacion);
    body.append('problema', data.problema);
    body.append('justificacion', data.justificacion);
    body.append('objetivo', data.objetivo);
    body.append('alcance', data.alcance);
    body.append('solicitudTrabajoGradoId', data.solicitudTrabajoGradoId);
    body.append('userId', userId ?? '');

    body.append('cartaAceptacionDirector', data.cartaAceptacionDirector);
    body.append('propuestaTrabajoGrado', data.propuestaTrabajoGrado);

    return this.http.post<Propuesta>(`/propuesta/estudiante`, body);
  }

  /**
   * Recibe el id de la propuesta con la data nueva y actualiza la propuesta
   * @param id id de la propuesta
   * @param data data de la propuesta actualizada
   * @returns retorna la propuesta actualizada
   */
  updatePropuesta(
    id: string,
    data: UpdatePropuestaEstudiante
  ): Observable<Propuesta> {
    return this.http.put<Propuesta>(`/propuesta/estudiante/${id}`, data);
  }

  /**
   * Recibe el id de la propuesta con la data nueva y actualiza la propuesta
   * @param id id de la propuesta
   * @param data data de la propuesta actualizada
   * @returns retorna la propuesta actualizada
   */
  updatePropuestaPendiente(id: string, data: { estado: 'PENDIENTE' }) {
    return this.http.put<Propuesta>(
      `/propuesta/estudiante/pendiente/${id}`,
      data
    );
  }

  /**
   * Recibe el id del propuestaFile, File y Tipo para actualizar el file
   * @param id id de la propuestaFile
   * @param file archivo seleccionado por el usuario
   * @param tipo tipo de archivo el propuestaFile
   * @returns retorna la propuesta actualizada con los files
   */
  updatePropuestaFile(
    id: string,
    propuestaFileId: string,
    file: any
  ): Observable<Propuesta> {
    const body = new FormData();
    body.append('propuestaFileId', propuestaFileId);
    body.append('file', file);
    return this.http.put<Propuesta>(`/propuesta/estudiante/file/${id}`, body);
  }
}
