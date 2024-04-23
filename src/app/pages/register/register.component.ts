import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/User";
import {
  ConfirmedValidator,
  getErrorMessage,
  NAME_REGX, STRONG_PASSWORD_REGX
} from "../../shared/constants";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;

  registerForm: FormGroup = this.createForm({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    rpassword: '',
  });
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService){ }

  createForm(model: User){
    let formGroup = this.formBuilder.group(
      model, {
        validator: ConfirmedValidator('password', 'rpassword')
      }
    );
    formGroup.get('email')?.addValidators([Validators.required, Validators.email]);
    formGroup.get('firstname')?.addValidators([Validators.required, Validators.pattern(NAME_REGX)]);
    formGroup.get('lastname')?.addValidators([Validators.required, Validators.pattern(NAME_REGX)]);
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern(STRONG_PASSWORD_REGX)]);
    return formGroup;
  }

  register(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm?.get('email')?.value!, this.registerForm.get('password')?.value!).then(cred => {
        console.log("ASDDDDDDD");
        this.router.navigateByUrl("/main");
      }).catch(error => {
        console.log(error);
      })
    }
  }

  protected readonly getErrorMessage = getErrorMessage;
}
