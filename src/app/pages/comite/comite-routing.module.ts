import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropuestasComponent } from './pages/propuestas/propuestas.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';
import { ReunionesComponent } from './pages/reuniones/reuniones.component';

const routes: Routes = [
  {
    path: 'reuniones',
    component: ReunionesComponent
  },
  {
    path: 'propuestas',
    component: PropuestasComponent,
  },
  {
    path: 'propuestas/propuesta/:id',
    component: DetallePropuestaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComiteRoutingModule { }
