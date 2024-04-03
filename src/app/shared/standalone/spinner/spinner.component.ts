import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@shared-services/spinner.service';
import { NgBootstrap } from '@third-party/ng-bootstrap.module';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, NgBootstrap],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
  /**
   * Booleano que define si se muestra o no el loader
   */
  isLoading$ = this.spinnerService.isLoading$;

  /**
   * Observable que captura el mensaje en caso de existir
   */
  isMessage$ = this.spinnerService.isMessage$;

  /**
   * Observable con el porcentaje de carga/descarga
   */
  isPercent$ = this.spinnerService.isPercent$;

  /**
   * Mensaje del spinner
   */
  message: string = '';

  /**
   * Constructor de la clase
   * @param spinnerService servicio para controlar el spinner
   */
  constructor(private spinnerService: SpinnerService) {}

  /**
   * Se subscribe al isMessage$ y lo asigna
   */
  ngOnInit(): void {
    this.isMessage$.subscribe((message) => (this.message = message));
  }
}
