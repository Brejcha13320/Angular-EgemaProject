import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InformeFinal,
  Jurado,
  JuradoInformeFinal,
} from '@interfaces/informe-final.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuradoService {
  constructor(private http: HttpClient) {}

  getJuradoInformesFinales(): Observable<JuradoInformeFinal[]> {
    return this.http.get<JuradoInformeFinal[]>(
      '/informe-final/jurado/informes-finales'
    );
  }

  getJuradoInformeFinalById(informeFinalId: string): Observable<InformeFinal> {
    return this.http.get<InformeFinal>(
      `/informe-final/jurado/informe-final/${informeFinalId}`
    );
  }

  getJuradoById(juradoId: string): Observable<Jurado> {
    return this.http.get<Jurado>(`/informe-final/jurado/${juradoId}`);
  }

  updateComentarioJurado(
    juradoId: string,
    data: { comentario: string }
  ): Observable<Jurado> {
    return this.http.post<Jurado>(`/informe-final/jurado/${juradoId}`, data);
  }
}
