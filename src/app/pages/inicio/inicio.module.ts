import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { COMOPONENTS } from './components';
import { ButtonComponent } from '@standalone/button/button.component';

@NgModule({
  declarations: [...COMOPONENTS],
  imports: [CommonModule, InicioRoutingModule, ButtonComponent],
})
export class InicioModule {}
