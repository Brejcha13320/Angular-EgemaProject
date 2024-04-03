import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropuestasComponent } from './pages/propuestas/propuestas.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';

const routes: Routes = [
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
export class ComiteRoutingModule {}
