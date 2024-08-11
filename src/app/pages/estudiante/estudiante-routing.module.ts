import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajoGradoComponent } from './pages/trabajo-grado/trabajo-grado.component';
import { PracticaProfesionalComponent } from './pages/practica-profesional/practica-profesional.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';
import { DetalleInformeFinalComponent } from './pages/detalle-informe-final/detalle-informe-final.component';

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
    path: 'trabajo-grado/informe-final/:id',
    component: DetalleInformeFinalComponent,
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
