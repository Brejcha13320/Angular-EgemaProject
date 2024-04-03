import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { LoginUser, RegisterUser, User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   *Constructor de la clase
   * @param http se usa para hacer las peticiones http
   * @param tokenService servicio para manejar los tokens
   * @param router controla el router para hacer navegaciones
   */
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  /**
   * Se comunica con backend para hacer el login y en el proceso despues de terminar la petición per
   * antes de enviarlo al componente se guarda el usuario y el token
   * @param email email digitado por el usuario
   * @param password password digitado por el usuario
   * @returns retorna un observable con la informacion obtenida en la petición
   */
  login(email: string, password: string): Observable<LoginUser> {
    return this.http
      .post<LoginUser>('/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((loginUser: LoginUser) => {
          this.tokenService.saveToken(loginUser.token);
          this.saveUser(loginUser.user);
        })
      );
  }

  /**
   * Hace el registro del usuario
   * @param email email digitado por el usuario
   * @param password password digitado por el usuario
   * @param nombre nombre digitado por el usuario
   * @returns retorna un observable con la informacion obtenida en la petición
   */
  register(email: string, password: string, nombre: string) {
    return this.http.post<RegisterUser>('/auth/register', {
      email,
      password,
      nombre,
    });
  }

  /**
   * Recibe el usuario y lo guarda en el localStorage como un string
   * mediante el stringify
   * @param user usuario logeado
   */
  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Obtiene el user del localStorage y si este existe hace el parse
   * para convertirlo de string a json y sino retorna un null
   * @returns retorna el usuario o un null en caso de no existir
   */
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Hace el logOut removiendo el token del localStorage y
   * hacer la navegacion al login
   */
  logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('/auth/login');
  }
}
