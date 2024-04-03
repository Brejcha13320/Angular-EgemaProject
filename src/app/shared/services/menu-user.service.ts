import { Injectable } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import { MenuUser } from '@interfaces/menu-user.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuUserService {
  /**
   * Menu del estudiante
   */
  private estudianteMenu: MenuUser[] = [
    {
      title: 'Inicio',
      bootstrapIcon: 'house',
      url: '/inicio',
    },
    {
      title: 'Trabajo de Grado',
      bootstrapIcon: 'code-slash',
      url: '/estudiante/trabajo-grado',
    },
    {
      title: 'Practica Profesional',
      bootstrapIcon: 'building',
      url: '/estudiante/practica-profesional',
    },
  ];

  /**
   * Menu del docente
   */
  private docenteMenu: MenuUser[] = [
    {
      title: 'Inicio',
      bootstrapIcon: 'house',
      url: '/inicio',
    },
    {
      title: 'Trabajo de Grado',
      bootstrapIcon: 'code-slash',
      url: '/docente/trabajo-grado',
    }
  ];

  /**
   * Menu del comite
   */
  private comiteMenu: MenuUser[] = [
    {
      title: 'Inicio',
      bootstrapIcon: 'house',
      url: '/inicio',
    },
    {
      title: 'Reuniones',
      bootstrapIcon: 'calendar-x',
      url: '/inicio',
    },
    {
      title: 'Propuestas',
      bootstrapIcon: 'card-checklist',
      url: '/comite/propuestas',
    },
    {
      title: 'Informe final',
      bootstrapIcon: 'journal',
      url: '/inicio',
    },
    {
      title: 'Sustentación',
      bootstrapIcon: 'person-check',
      url: '/inicio',
    }
  ];

  /**
   * Menu del jefePractica
   */
  private jefePracticaMenu: MenuUser[] = [];

  /**
   * Menu del coordinadorPractica
   */
  private coordinadorPracticaMenu: MenuUser[] = [];

  /**
   * Menu del admin
   */
  private adminMenu: MenuUser[] = [];

  /**
   * Contructor de la clase
   * @param authService servicio de auth
   */
  constructor(private authService: AuthService) { }

  /**
   * Retorna el menu del usuario segun el rol
   */
  getMenuUser(): MenuUser[] {
    const user = this.authService.getUser();

    switch (user?.rol) {
      case 'ESTUDIANTE':
        return this.estudianteMenu;

      case 'DOCENTE':
        return this.docenteMenu;

      case 'COMITE':
        return this.comiteMenu;

      case 'JEFE_PRACTICA':
        return this.jefePracticaMenu;

      case 'COORDINADOR_PRACTICA':
        return this.coordinadorPracticaMenu;

      case 'ADMIN':
        return this.adminMenu;

      default:
        return [];
    }
  }
}
