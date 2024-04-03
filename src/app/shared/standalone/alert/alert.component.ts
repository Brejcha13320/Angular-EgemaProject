import { Component, Input } from '@angular/core';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { NgBootstrap } from '@third-party/ng-bootstrap.module';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgBootstrap],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  /**
   * Esta propiedad indica si en la parte superior derecha sale la X
   * para hacer close del alert
   */
  @Input() dismissible: boolean = false;
  /**
   * Titulo principal del alert
   */
  @Input() title: string = '';
  /**
   * Texto del alert
   */
  @Input() text: string = '';
  /**
   * Tipo de alert, este le da el color segun la opcion elegida
   */
  @Input() type: ClaseColor = 'info';
}
