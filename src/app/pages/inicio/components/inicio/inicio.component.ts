import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-services/auth.service';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logOut() {
    this.authService.logout();
  }
}
