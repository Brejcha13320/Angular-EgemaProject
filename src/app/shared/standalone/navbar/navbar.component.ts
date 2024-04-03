import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import { ClaseColor } from '@interfaces/clase-color.interface';
import { RolUser } from '@interfaces/user.interface';
import { BadgeComponent } from '@standalone/badge/badge.component';
import { NgBootstrap } from '@third-party/ng-bootstrap.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgBootstrap, BadgeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /**
   * Nombre del usuario logeado
   */
  nameUser: string = '';
  /**
   * Rol del usuario logeado
   */
  rolUser: string = '';
  /**
   * Nombre del Rol
   */
  estadoMap: Record<RolUser, string> = {
    ESTUDIANTE: 'Estudiante',
    DOCENTE: 'Docente',
    COMITE: 'Comité',
    JEFE_PRACTICA: 'Jefe Práctica',
    COORDINADOR_PRACTICA: 'Coordinador Práctica',
    ADMIN: 'Admin',
  };
  /**
   * Clase segun el estado
   */
  estadoClassMap: Record<RolUser, ClaseColor> = {
    ESTUDIANTE: 'success',
    DOCENTE: 'primary',
    COMITE: 'warning',
    JEFE_PRACTICA: 'danger',
    COORDINADOR_PRACTICA: 'info',
    ADMIN: 'light',
  };

  /**
   * Constructor de la clase
   * @param authService servicio del auth
   */
  constructor(private authService: AuthService) { }

  /**
   * Se comunica con el authService para obtener la informacion
   * del usuario que esta logeado
   */
  ngOnInit(): void {
    this.nameUser = this.authService.getUser()?.nombre || '';
    this.rolUser = this.authService.getUser()?.rol || '';
  }

  /**
   * Se comunica con el authService para hacer logOut
   */
  logOut() {
    this.authService.logout();
  }

  convertClaseColor(value: string) {
    return value as ClaseColor;
  }
}
