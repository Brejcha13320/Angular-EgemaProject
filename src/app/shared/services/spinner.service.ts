import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  /**
   * Subject que captura/emite un booleano que activa o desactiva el spinner general
   */
  isLoading$ = new Subject<boolean>();

  /**
   * Subject que captura/emite el mensaje a mostrar en la pantalla de carga
   */
  isMessage$ = new Subject<string>();

  /**
   * Subject que captura/emite el porcentaje de avance (carga - descarga) en la conexion
   */
  isPercent$ = new Subject<number>();

  /**
   * Muestra el loader con los Subjects correspondientes, con o sin mensaje
   * @param message texto a mostrar mientras dura el spinner
   */
  show(message: string = ''): void {
    this.isLoading$.next(true);
    this.isMessage$.next(message);
  }

  /**
   * Muestra el progress bar con el porcentaje de carga
   * @param percent porcentaje de carga - descargar segun la conexion
   */
  showPercent(percent: number) {
    this.isPercent$.next(percent);
  }

  /**
   * Ocutal es spinner
   */
  hide(): void {
    this.isLoading$.next(false);
  }
}
