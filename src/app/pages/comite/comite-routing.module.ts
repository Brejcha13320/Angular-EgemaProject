import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropuestasComponent } from './pages/propuestas/propuestas.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';
import { ReunionesComponent } from './pages/reuniones/reuniones.component';
import { InformesFinalesComponent } from './pages/informes-finales/informes-finales.component';
import { DetalleInformeFinalComponent } from './pages/detalle-informe-final/detalle-informe-final.component';
import { JuradoComponent } from '@standalone/jurado/jurado.component';

const routes: Routes = [
  {
    path: 'reuniones',
    component: ReunionesComponent,
  },
  {
    path: 'propuestas',
    component: PropuestasComponent,
  },
  {
    path: 'propuestas/propuesta/:id',
    component: DetallePropuestaComponent,
  },
  {
    path: 'informes-finales',
    component: InformesFinalesComponent,
  },
  {
    path: 'informes-finales/informe-final/:id',
    component: DetalleInformeFinalComponent,
  },
  {
    path: 'jurado',
    component: JuradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComiteRoutingModule {}
