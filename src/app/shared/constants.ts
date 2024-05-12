import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {User} from "./models/User";
import {FormControlName} from "./models/FormControlName";

export const STRONG_PASSWORD_REGX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*?[#?!@$%^.&*-]).+$/;
export const NAME_REGX: RegExp = /^[a-zA-Z ,.'-]+$/;

const UPPERCASE_LETTER_REGX: RegExp = /(?=.*[A-Z])/;
const LOWERCASE_LETTER_REGX: RegExp = /(?=.*[a-z])/;
const SPECIAL_CHARACTER_REGX: RegExp = /(?=.*?[#?!@$%^.&*-])/;
const NUMBER_REGX: RegExp = /(?=.*\d)/;

const FORM_CONTROL_NAME: FormControlName = {
  email: "Email cím",
  firstname: "Keresztnév",
  lastname: "Vezetéknév",
  password: "Jelszó",
  rpassword: "Jelszó újra",
  state: "Gázóra állás"
}

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName) => `A(z) ${formControlName} megadása kötelező.`,
  email: () => `Nem helyes Email cím formátum.`,
  minlength: (formControlName, minLength) => `${formControlName} legalább ${minLength} karakter hosszú kell, hogy legyen.`,
  maxlength: (formControlName, maxLength, isNumberType = false) => `${formControlName} maximum ${!isNumberType ? maxLength : Math.abs(maxLength).toString().length} karakter hosszú lehet.`,
  strongpassword: (formControlName, value) => {
    let message = `A ${formControlName} nem megfelelő. `;
    let hints: Array<string> = [];

    if(!UPPERCASE_LETTER_REGX.test(value)){
      hints.push('nagy betű');
    }
    if(!LOWERCASE_LETTER_REGX.test(value)){
      hints.push('kis betű');
    }
    if(!SPECIAL_CHARACTER_REGX.test(value)){
      hints.push('speciális karakter');
    }
    if(!NUMBER_REGX.test(value)){
      hints.push('szám');
    }

    return message + (hints.length > 0 ? `(${hints.join(', ')})` : '');
  },
  matchingpassword: () => "A megadott jelszavak nem egyeznek.",
  wrongState: () => "Vissza felé nem pöröghet az óra :)",
  name: (formControlName) => `Nem megfelelő ${formControlName}.`
};

export function getErrorMessage<Key extends keyof FormControlName>(form: FormGroup, formControlName: Key, patternName ?: string){
  if (form.get(formControlName)?.hasError('required')){
    return ERROR_MESSAGES['required'](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog") || "Hiba";
  }

  if (form.get(formControlName)?.hasError('email')){
    return ERROR_MESSAGES['email'](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog") || "Hiba";
  }

  if (form.get(formControlName)?.hasError('minlength')){
    return ERROR_MESSAGES['minlength'](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog", form?.get(formControlName)?.errors?.['minlength'].requiredLength) || "Hiba";
  }

  if (form.get(formControlName)?.hasError('maxlength')){
    return ERROR_MESSAGES['maxlength'](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog", form?.get(formControlName)?.errors?.['maxlength'].requiredLength) || "Hiba";
  }

  if (form.get(formControlName)?.hasError('max')){
    return ERROR_MESSAGES['maxlength'](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog", form?.get(formControlName)?.errors?.['max'].max, true) || "Hiba";
  }

  if (form.get(formControlName)?.hasError('pattern')){
    return patternName ? ERROR_MESSAGES[patternName](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog", form?.get(formControlName)?.value) || "Hiba" : "Hiba";
  }

  if (form.get(formControlName)?.hasError('confirmedValidator')){
    return ERROR_MESSAGES['matchingpassword']() || "Hiba";
  }

  if (form.get(formControlName)?.hasError('stateValidator')){
    return ERROR_MESSAGES['wrongState']() || "Hiba";
  }

  return "Hiba";
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl?.errors && !matchingControl.hasError('confirmedValidator')) {
      return;
    }
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ confirmedValidator: true });
      return;
    }
    matchingControl?.setErrors(null);
  }
}

export function StateValidator(controlName: string, currentControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const currentControl = formGroup.controls[currentControlName];

    if (control?.errors){
      return;
    }

    if(control?.value <= currentControl?.value){
      control?.setErrors({ stateValidator: true });
      return;
    }

    control?.setErrors(null);
  }
}
