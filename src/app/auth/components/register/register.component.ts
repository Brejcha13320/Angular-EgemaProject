import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '@shared-services/notify.service';
import { MyValidators } from '@utils/my-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  /**
   * formulario de registro
   */
  form!: UntypedFormGroup;

  /**
   * get para el value del email del formulario
   */
  get email() {
    return this.form.get('email')?.value;
  }

  /**
   * get para el value del nombre del formulario
   */
  get nombre() {
    return this.form.get('nombre')?.value;
  }

  /**
   * get para el value del password del formulario
   */
  get password() {
    return this.form.get('password')?.value;
  }

  /**
   * get para el value del confirm password del formulario
   */
  get confirmPassword() {
    return this.form.get('confirmPassword')?.value;
  }

  /**
   *
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
  ) { }

  /**
   * Llama la funcion para crear el formulario
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Crea el formulario
   */
  createForm() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: MyValidators.matchPasswords,
      }
    );
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
   * Registrar al usuario
   */
  register() {
    if (this.form.invalid) {
      console.log(this.form);
      this.form.markAllAsTouched();
      this.notifyService.open({
        title: 'Error en el Formulario',
        message: 'Por favor complete el formulario',
        clase: 'danger',
      });
    } else {
      this.authService
        .register(this.email, this.password, this.nombre)
        .subscribe(
          () => {
            this.notifyService.open({
              title: 'Registro Exitoso',
              message: 'Ahora Inicia Sesión',
              clase: 'success',
            });
            this.redirectTo('auth/login');
          },
          () => {
            this.notifyService.open({
              title: 'Error al Registrarse',
              message: 'Por favor verifique sus datos',
              clase: 'danger',
            });
          }
        );
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
