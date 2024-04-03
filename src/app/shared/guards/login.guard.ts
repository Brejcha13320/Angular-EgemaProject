import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth-services/auth.service';
import { TokenService } from '@auth-services/token.service';
import { map } from 'rxjs';

export const LoginGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return tokenService.validateToken().pipe(
    map(({ authorization, error }) => {
      if (!authorization) {
        //Token no valido o no lo tiene, entonce si tiene que estar en el auth
        console.log('[Token Not Valid] Puede estar en el auth');
        authService.logout();
        return true;
      } else {
        //Token valido no puede estar en el auth, entonces va al inicio
        console.log('[Token Valid] No puede estar en el auth');
        router.navigateByUrl('/inicio');
        return false;
      }
    })
  );
};
