import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {

    if (formGroup) {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('repeat_password');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordsDoNotMatch: true };
      }
    }
    return null;
  };
}
