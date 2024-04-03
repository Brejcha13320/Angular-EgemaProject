import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComiteRoutingModule } from './comite-routing.module';
import { PropuestasComponent } from './pages/propuestas/propuestas.component';
import { TablePropuestasComponent } from './components/table-propuestas/table-propuestas.component';
import { TitleSectionComponent } from '@standalone/title-section/title-section.component';
import { AlertComponent } from '@standalone/alert/alert.component';
import { DropdownComponent } from '@standalone/dropdown/dropdown.component';
import { BadgeComponent } from '@standalone/badge/badge.component';
import { ItemEmailComponent } from '@standalone/item-email/item-email.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';
import { DetailPropuestaComponent } from '@standalone/detail-propuesta/detail-propuesta.component';
import { ButtonComponent } from '@standalone/button/button.component';
import { NgBootstrap } from '@third-party/ng-bootstrap.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PropuestasComponent,
    TablePropuestasComponent,
    DetallePropuestaComponent,
  ],
  imports: [
    CommonModule,
    NgBootstrap,
    ComiteRoutingModule,
    ReactiveFormsModule,
    TitleSectionComponent,
    AlertComponent,
    DropdownComponent,
    BadgeComponent,
    ItemEmailComponent,
    DetailPropuestaComponent,
    ButtonComponent,
  ],
})
export class ComiteModule {}
