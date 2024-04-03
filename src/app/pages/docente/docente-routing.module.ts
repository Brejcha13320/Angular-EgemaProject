import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajoGradoComponent } from './pages/trabajo-grado/trabajo-grado.component';

const routes: Routes = [
  {
    path: 'trabajo-grado',
    component: TrabajoGradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }
