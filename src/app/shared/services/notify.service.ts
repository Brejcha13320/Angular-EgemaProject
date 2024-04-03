import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarType } from '../standalone/snackbar/snackbar.component';

export interface Notify {
  title: string;
  message: string;
  time?: string | Date;
  clase: SnackbarType;
}

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  /**
   * Subject que crea el flujo Observable que contiene la notificacion a ser renderiaza
   */
  private showNotifySub$: Subject<Notify> = new Subject();
  /**
   * Observable creado a partir de showNotifySub; el Subject. Sirve para suscribirse al Observable que dispara y trasmite la notificacion
   */
  public showNotify$: Observable<Notify> = this.showNotifySub$.asObservable();

  constructor() {}

  /**
   * Usa el subject de showNotifySub$ para iniciar la emision de la notificacion al observable que a su vez renderizara el componente de snackbar en la vista del usuario
   * @param notification {Notify}
   */
  open(notification: Notify) {
    this.showNotifySub$.next(notification);
  }
}
