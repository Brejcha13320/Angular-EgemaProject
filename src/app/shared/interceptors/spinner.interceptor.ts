// import { HttpInterceptorFn } from '@angular/common/http';

// export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import { SpinnerService } from '@shared-services/spinner.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  /**
   * Contructor de la clase
   * @param spinnerService servicio para controlar el spinner
   * @param authService servicio del auth del usuario
   */
  constructor(
    private spinnerService: SpinnerService,
    private authService: AuthService
  ) {}

  /**
   * Recibe la peticion y aplica el spinner y este se desaparece solo cuando la petición
   * se ha finalizado de manera exitosa o el proceso ha fallado
   * @param request Peticion http que esta pasando por el interceptor en ese momento
   * @param next hace que el proceso continue al siguiente interceptor o al final de peticion
   * @returns retorna la petcion http con los cambios aplicados
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Muestra el spinner antes de iniciar la solicitud
    this.spinnerService.show('Espere un momento...');

    // Clona la solicitud y habilita el seguimiento de progreso
    const cloneReq = request.clone({ reportProgress: true });

    // Maneja la solicitud clonada
    return next.handle(cloneReq).pipe(
      tap(
        (event) => {
          //El uploadProgress solo esta cuando suben archivos al parecer
          if (event.type === HttpEventType.UploadProgress) {
            // Notifica al servicio de spinner sobre el progreso
            const progress = Math.round((100 * event.loaded) / event.total!);

            this.spinnerService.showPercent(progress);
          } else if (event.type === HttpEventType.Response) {
            // La solicitud se ha completado, oculta el spinner
            this.spinnerService.hide();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.hide();
          // Maneja el error de la solicitud y oculta el spinner
          if (error.status === 401 && error.error.error == 'Invalid token') {
            this.authService.logout();
          }
        }
      )
    );
  }
}
