import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;

  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl(''),
  // })
  loginForm = this.createForm({
    email: '',
    password: ''
  });
  constructor(private formBuilder: FormBuilder){ }

  createForm(model: User){
    let formGroup = this.formBuilder.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email])
    formGroup.get('password')?.addValidators([Validators.required])
    return formGroup;
  }

  login(){
    if(this.loginForm.valid){
      //ellenorizni db-be van-e felhasznalo + jelszo egyezik-e
    }
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
