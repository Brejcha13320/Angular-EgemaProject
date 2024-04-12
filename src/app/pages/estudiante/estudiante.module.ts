import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { AlertComponent } from '@standalone/alert/alert.component';
import { TitleSectionComponent } from '@standalone/title-section/title-section.component';
import { ButtonComponent } from '@standalone/button/button.component';
import { DropdownComponent } from '@standalone/dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrabajoGradoComponent } from './pages/trabajo-grado/trabajo-grado.component';
import { PracticaProfesionalComponent } from './pages/practica-profesional/practica-profesional.component';
import { BadgeComponent } from '@standalone/badge/badge.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { SolicitudTrabajoGradoComponent } from './components/solicitud-trabajo-grado/solicitud-trabajo-grado.component';
import { ItemEmailComponent } from '@standalone/item-email/item-email.component';
import { DetallePropuestaComponent } from './pages/detalle-propuesta/detalle-propuesta.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { ModalHeaderComponent } from '@standalone/modal-header/modal-header.component';
import { ModalFooterComponent } from '@standalone/modal-footer/modal-footer.component';
import { ModalCreatePropuestaComponent } from './components/modal-create-propuesta/modal-create-propuesta.component';
import { ModalCreateSolicitudComponent } from './components/modal-create-solicitud/modal-create-solicitud.component';
import { DetailPropuestaComponent } from '@standalone/detail-propuesta/detail-propuesta.component';
import { InformeFinalComponent } from './components/informe-final/informe-final.component';
import { ModalUpdateArchivosComponent } from './components/modal-update-archivos/modal-update-archivos.component';

@NgModule({
  declarations: [
    TrabajoGradoComponent,
    PracticaProfesionalComponent,
    SolicitudTrabajoGradoComponent,
    ModalCreateSolicitudComponent,
    PropuestaComponent,
    DetallePropuestaComponent,
    ModalCreatePropuestaComponent,
    InformeFinalComponent,
    ModalUpdateArchivosComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    EstudianteRoutingModule,
    AlertComponent,
    BadgeComponent,
    ButtonComponent,
    DropdownComponent,
    ItemEmailComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    TitleSectionComponent,
    DetailPropuestaComponent,
  ],
})
export class EstudianteModule {}
