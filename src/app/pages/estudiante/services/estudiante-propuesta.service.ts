import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import { TokenService } from '@auth-services/token.service';
import { environment } from '@environments/environment';
import {
  CreatePropuesta,
  Propuesta,
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
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

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
  async createPropuesta(data: CreatePropuesta): Promise<Propuesta> {
    const headers = new Headers();
    const token = this.tokenService.getToken();
    const userId = this.authService.getUser()?.id;

    if (token === '' || !token) {
      throw Error('Token not found');
    }

    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Accept', '*/*');

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

    const response = await fetch(
      `${environment.apiBaseUrl}/api/propuesta/estudiante`,
      {
        method: 'POST',
        body,
        headers,
      }
    );

    return await response.json();
  }

  updatePropuesta(
    id: string,
    data: UpdatePropuestaEstudiante
  ): Observable<Propuesta> {
    return this.http.put<Propuesta>(`/propuesta/estudiante/${id}`, data);
  }
}
