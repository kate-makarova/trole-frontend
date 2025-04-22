import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordDifficultyValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {

    if (formGroup) {
      const password = formGroup.get('password');

      if (password && password.value.length >0 && password.value.length < 8) {
        return { passwordTooShort: true };
      }
    }
    return null;
  };
}
