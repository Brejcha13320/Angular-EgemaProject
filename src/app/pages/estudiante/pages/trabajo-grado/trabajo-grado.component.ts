import { Component } from '@angular/core';

@Component({
  templateUrl: './trabajo-grado.component.html',
  styleUrl: './trabajo-grado.component.scss',
})
export class TrabajoGradoComponent {
  /**
   * Titulo de la sección
   */
  title: string = 'Trabajo de Grado';
  /**
   * Mensaje de la sección
   */
  message: string =
    'Esta sección te permite crear y dar seguimiento a tu solicitud de trabajo de grado. Obtén asistencia personalizada y asegúrate de avanzar de manera precisa en cada etapa de tu proyecto académico.';
  /**
   * Titulo del accordion
   */
  items = ['Solicitud', 'Propuesta', 'Informe Final'];
}
