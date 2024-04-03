import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth-services/auth.service';
import { TokenService } from '@auth-services/token.service';
import { map } from 'rxjs';

/**
 * Guard para verificar si el usuario esta autenticado
 * @returns retorna un true si esta autenticado sino un false y hace logOut
 */
export const AuthGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  return tokenService.validateToken().pipe(
    map(({ authorization, error }) => {
      if (!authorization) {
        //El Token no es valido entonces LogOut
        console.log('[Token Not Valid] LogOut', error);
        authService.logout();
        return false;
      } else {
        //Token valido puede entrar
        console.log('[Token Valid] Puede entrar');
        return true;
      }
    })
  );
};
