import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuUser } from '@interfaces/menu-user.interface';
import { MenuUserService } from '@shared-services/menu-user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  /**
   * Menu del usuario
   */
  menuUser: MenuUser[] = [];

  /**
   *
   * @param menuUserService servicio para consultar el menu del usuario
   */
  constructor(private menuUserService: MenuUserService) {}

  /**
   * consulta el menu del usuario
   */
  ngOnInit(): void {
    this.menuUser = this.menuUserService.getMenuUser();
  }
}
