import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { TrabajoGradoComponent } from './pages/trabajo-grado/trabajo-grado.component';


@NgModule({
  declarations: [
    TrabajoGradoComponent
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule
  ]
})
export class DocenteModule { }
