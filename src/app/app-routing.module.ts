import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/login.guard';
import { LayoutComponent } from '@standalone/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [LoginGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./pages/inicio/inicio.module').then((m) => m.InicioModule),
      },
      {
        path: 'estudiante',
        loadChildren: () =>
          import('./pages/estudiante/estudiante.module').then(
            (m) => m.EstudianteModule
          ),
      },
      {
        path: 'comite',
        loadChildren: () =>
          import('./pages/comite/comite.module').then((m) => m.ComiteModule),
      },
      {
        path: 'docente',
        loadChildren: () =>
          import('./pages/docente/docente.module').then((m) => m.DocenteModule),
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
