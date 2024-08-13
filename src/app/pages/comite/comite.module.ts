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
import { ReunionesComponent } from './pages/reuniones/reuniones.component';
import { DetalleReunionComponent } from './pages/detalle-reunion/detalle-reunion.component';
import { InformesFinalesComponent } from './pages/informes-finales/informes-finales.component';
import { DetalleInformeFinalComponent } from './pages/detalle-informe-final/detalle-informe-final.component';
import { TableInformesFinalesComponent } from './components/table-informes-finales/table-informes-finales.component';
import { DetailInformeFinalComponent } from '@standalone/detail-informe-final/detail-informe-final.component';
import { ModalAsignarJuradosComponent } from './components/modal-asignar-jurados/modal-asignar-jurados.component';
import { ModalHeaderComponent } from '@standalone/modal-header/modal-header.component';
import { ModalFooterComponent } from '@standalone/modal-footer/modal-footer.component';
import { ModalEditarEstadoComponent } from './components/modal-editar-estado/modal-editar-estado.component';

@NgModule({
  declarations: [
    PropuestasComponent,
    TablePropuestasComponent,
    DetallePropuestaComponent,
    ReunionesComponent,
    DetalleReunionComponent,
    InformesFinalesComponent,
    DetalleInformeFinalComponent,
    TableInformesFinalesComponent,
    ModalAsignarJuradosComponent,
    ModalEditarEstadoComponent,
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
    DetailInformeFinalComponent,
    ButtonComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
})
export class ComiteModule {}
