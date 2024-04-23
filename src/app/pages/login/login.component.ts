import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../../shared/models/User";
import { getErrorMessage, STRONG_PASSWORD_REGX } from "../../shared/constants";
import {AuthService} from "../../shared/services/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  asd = new FormGroup({
    ASD: new FormControl("")
  })
  loginForm = this.createForm({
    email: '',
    password: ''
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService){ }

  createForm(model: User){
    let formGroup = this.formBuilder.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email])
    formGroup.get('password')?.addValidators([Validators.required])

    return formGroup;
  }

  async login(){
    if(this.loginForm.valid){
      console.log("xd")
      this.authService.login(this.loginForm?.get('email')?.value!, this.loginForm.get('password')?.value!).then(cred => {
        console.log("asdddddddddddddd");
        this.router.navigateByUrl("/main");
      }).catch(error => {
        console.log(error);
      })
    }
  }

    protected readonly getErrorMessage = getErrorMessage;
}
