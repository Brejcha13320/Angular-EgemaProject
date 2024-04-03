import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajoGradoComponent } from './pages/trabajo-grado/trabajo-grado.component';
import { PracticaProfesionalComponent } from './pages/practica-profesional/practica-profesional.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';

const routes: Routes = [
  {
    path: 'trabajo-grado',
    component: TrabajoGradoComponent,
  },
  {
    path: 'trabajo-grado/propuesta/:id',
    component: DetallePropuestaComponent,
  },
  {
    path: 'practica-profesional',
    component: PracticaProfesionalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule {}
