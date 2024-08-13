import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { TokenService } from '@auth-services/token.service';
import { AuthService } from '@auth-services/auth.service';
import { environment } from '@environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  /**
   * Url del backend segun el environment
   */
  apiUrl = environment.apiBaseUrl;

  /**
   * Contructor de la clase
   * @param tokenService servicio de tokens
   * @param authService servicio del auth del usuario
   */
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  /**
   * Recibe la peticion y la clona para agregar la url de backend segun los environments,
   * luego valida la url de la petición para saber si hay que agregarle token, si no requiere token
   * hace next y continua, en caso contrario llama a addToken para agregar el token, si sucede un error
   * en este proceso de addToken hace logOut
   * @param request Peticion http que esta pasando por el interceptor en ese momento
   * @param next hace que el proceso continue al siguiente interceptor o al final de peticion
   * @returns retorna la petcion http con los cambios aplicados
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //URL QUE NO NECESITAN MODIFICACION
    if (request.url.includes('/assets/')) {
      return next.handle(request);
    }

    //CLONAMOS LA REQUEST Y AGREGAMOS LA URL
    let requestClone = request.clone({
      url: this.apiUrl + '/api' + request.url,
      headers: request.headers,
    });

    //URL QUE NO NECESITAN TOKEN
    if (
      requestClone.url.includes('/auth/login') ||
      requestClone.url.includes('/auth/register') ||
      requestClone.url.includes('/auth/recovery') ||
      requestClone.url.includes('/auth/recovery-password')
    ) {
      return next.handle(requestClone);
    }

    //AGREGAMOS EL TOKEN EN LOS HEADERS Y HACEMOS LA PETICIÓN
    return this.addToken(requestClone, next).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.error == 'Invalid token') {
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Recibe la request y le agrega el token en los headers si este existe, si no hace el next
   * @param request Peticion http que esta pasando por el interceptor en ese momento
   * @param next hace que el proceso continue al siguiente interceptor o al final de peticion
   * @returns retorna la petcion http con los cambios de token aplicados
   */
  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.tokenService.getToken();
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
