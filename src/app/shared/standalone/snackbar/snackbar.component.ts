import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Notify, NotifyService } from '../../services/notify.service';
import { CommonModule } from '@angular/common';

export type SnackbarType = 'success' | 'alert' | 'danger' | 'info';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit, OnDestroy {
  snackbarSubs$: Subscription | undefined;

  /**
   * Titulo de la notificación
   */
  title: string = '';
  /**
   * Tiempo de la notificación
   */
  time: string | Date = '';
  /**
   * mensaje de la notificación
   */
  message: string = '';
  /**
   * Tipo de notificación
   */
  clase: SnackbarType = 'success';

  /**
   * Contructor de la clase
   * @param notifyService servicio para controlar las notificaciones
   */
  constructor(private notifyService: NotifyService) {}

  /**
   * Se subscribe al observable showNotify$ y en proceso
   * actualiza las variables globales del title, message, clase y time
   * y luego hace el openSnackbar para habilitarlo y asi mostrar la alerta
   * con las variables actuales
   */
  ngOnInit(): void {
    this.snackbarSubs$ = this.notifyService.showNotify$
      .pipe(
        map((notify: Notify) => {
          this.title = notify.title;
          this.message = notify.message;
          this.clase = notify.clase;
          this.time = notify.time ? notify.time : '';
        })
      )
      .subscribe((response) => {
        this.openSnackbar();
      });
  }

  /**
   * Cuando la notificacion termina, esta hace el unsubscribe
   * de la subscripcion al observable principal
   */
  ngOnDestroy(): void {
    this.snackbarSubs$?.unsubscribe();
  }

  /**
   * Muestra el snackbar agregandole la clase show y luego le da un
   * tiempo para ocultarlo
   */
  openSnackbar() {
    let snackBar: any = document.getElementById('snackbar');
    snackBar.className = 'show';

    setTimeout(() => {
      snackBar.className = snackBar.className.replace('show', '');
    }, 4000);
  }
}
