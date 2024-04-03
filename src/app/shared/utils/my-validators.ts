import { AbstractControl } from '@angular/forms';

export class MyValidators {
  /**
   * Validator global del formulario para ver si las password hacen match
   * @param control control del formulario
   * @returns returna un null o { match_password: true } segun el match
   */
  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { match_password: true };
    }
  }
}
