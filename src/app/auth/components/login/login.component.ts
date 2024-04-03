import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '@shared-services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /**
   * Formulario de login
   */
  form!: UntypedFormGroup;

  /**
   * Recordar usuario
   */
  rememberEmail = false;

  /**
   * email del local storage
   */
  localStorageEmail = '';

  /**
   * Retorna el value del email
   */
  get email() {
    return this.form.value.email;
  }

  /**
   * Retorna el value del password
   */
  get password() {
    return this.form.value.password;
  }

  /**
   * Constructor de la clase y a su vez obtiene el email del localStorage y si existe
   * lo guarda en una variable y hace el true del checkbox de rememberEmail
   * @param router controla el router para hacer navegaciones
   * @param fb se usa para crear los formularios
   * @param authService servicio de auth del usuario para hacer el login
   * @param notifyService servicio de noticiaciones para alertas
   */
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService
  ) {
    if (localStorage.getItem('email')) {
      this.localStorageEmail = localStorage.getItem('email') + '';
      this.rememberEmail = true;
    }
  }

  /**
   * llama la funcion de crear formulario
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Crea el formulario
   */
  createForm() {
    this.form = this.fb.group({
      email: [this.localStorageEmail, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Valida si un control del formulario es valido
   * @param ctrName nombre del control del formulario
   * @returns retorna si no ha sido tocado o tiene errores
   */
  isInvalid(ctrName: string) {
    const control = this.form.get(ctrName);
    return control?.touched && control?.errors;
  }

  /**
   * Valida si un control del formulario es valido
   * @param ctrName nombre del control del formulario
   * @returns retorna si no ha sido tocado o es valido
   */
  isValid(ctrName: string) {
    const control = this.form.get(ctrName);
    return control?.touched && control?.valid;
  }

  /**
   * Logear al usuario
   */
  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Error en el Formulario',
        message: 'Por favor complete el formulario',
        clase: 'danger',
      });
    } else {
      this.authService.login(this.email, this.password).subscribe(
        () => {
          this.notifyService.open({
            title: 'Inicio de Sesión Exitoso',
            message: 'Datos Correctos',
            clase: 'success',
          });
          this.rememberEmailStorage();
          this.redirectTo('/inicio');
        },
        () => {
          this.notifyService.open({
            title: 'Error al Inicial Sesión',
            message: 'Por favor verifique sus credenciales',
            clase: 'danger',
          });
        }
      );
    }
  }

  /**
   * Guarda el email del usuario en el local storage o lo elimina
   */
  rememberEmailStorage() {
    if (this.rememberEmail) {
      localStorage.setItem('email', this.email);
    } else {
      localStorage.removeItem('email');
    }
  }

  /**
   * Recibe una ruta y mediante el router redirige al usuario
   * @param ruta ruta a donde se va redirigir el usuario
   */
  redirectTo(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
}
