import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidateToken } from '@interfaces/auth.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  /**
   *Constructor de la clase
   * @param http se usa para hacer las peticiones http
   */
  constructor(private http: HttpClient) {}

  /**
   * Recibe el token y lo guarda en el localStorage
   * @param token token del usuario
   */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Retorna el token del usuario del localStorage
   * @returns token del usuario
   */
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  /**
   * Esta funcion elimina el token pero tambien borrar el user
   * esto se hace porque cuando se hace el logOut no solo se debe eliminar
   * el token sino la informacion del usuario en general que se ha guardado
   * cuando el se logea en el localStorage
   */
  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Obtiene el token con el metodo getToken y luego valida de que no sea un string vacio,
   * si no es valido el token del localStorage retorna un observable con un error simulando
   * el que llega de la peticion http y si todo sale bien retorna la petición
   * @returns retorna un observable con la informacion obtenida en la petición
   */
  validateToken(): Observable<ValidateToken> {
    const token = this.getToken();

    if (!token || token === '') {
      return of({
        authorization: false,
        error: 'localStorage Token is not valid',
      });
    }

    return this.http
      .get<ValidateToken>('/auth/validate-token')
      .pipe(catchError((error) => of(error)));
  }
}
