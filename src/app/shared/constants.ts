import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {User} from "./models/User";

export const STRONG_PASSWORD_REGX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*?[#?!@$%^.&*-]).+$/;
export const NAME_REGX: RegExp = /^[a-z ,.'-]+$/;

const UPPERCASE_LETTER_REGX: RegExp = /(?=.*[A-Z])/;
const LOWERCASE_LETTER_REGX: RegExp = /(?=.*[a-z])/;
const SPECIAL_CHARACTER_REGX: RegExp = /(?=.*?[#?!@$%^.&*-])/;
const NUMBER_REGX: RegExp = /(?=.*\d)/;

const FORM_CONTROL_NAME: User = {
  email: "Emailcím",
  firstname: "Keresfiztnév",
  lastname: "Vezetéknév",
  password: "Jelszó",
  rpassword: "Jelszó ujra"
}

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName) => `A(z) ${formControlName} megadása kötelező.`,
  email: () => `Nem helyes Emailcím formátum.`,
  minlength: (formControlName, minLength) => `${formControlName} legalább ${minLength} karakter hosszú kell, hogy legyen.`,
  maxlength: (formControlName, maxLength) => `${formControlName} maximum ${maxLength} karakter hosszú lehet.`,
  strongpassword: (formControlName, value) => {
    let message = `A ${formControlName} erőssége nem megfelelő.\n`;
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
    console.log(hints, value);
    return message + (hints.length > 0 ? `(${hints.join(', ')})` : '');
  },
  matchingpassword: () => "A megadott jelszavak nem egyeznek.",
  name: (formControlName) => `Nem megfelelő ${formControlName}.`
};

export function getErrorMessage<Key extends keyof User>(form: FormGroup, formControlName: Key, patternName ?: string){
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

  if (form.get(formControlName)?.hasError('pattern')){
    return patternName ? ERROR_MESSAGES[patternName](FORM_CONTROL_NAME[formControlName] || "Ismeretlen Dolog", form?.get(formControlName)?.value) || "Hiba" : "Hiba";
  }

  if (form.get(formControlName)?.hasError('confirmedValidator')){
    return ERROR_MESSAGES['matchingpassword']() || "Hiba";
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
    } else {
      matchingControl?.setErrors(null);
    }
  }
}
