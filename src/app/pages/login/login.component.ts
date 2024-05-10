import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../../shared/models/User";
import { getErrorMessage, STRONG_PASSWORD_REGX } from "../../shared/constants";
import {AuthService} from "../../shared/services/auth.service";
import {Route, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../shared/popup/popup.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginForm = this.createForm({
    email: '',
    password: ''
  });

  constructor(private router: Router, private dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService){ }

  createForm(model: User){
    let formGroup = this.formBuilder.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email])
    formGroup.get('password')?.addValidators([Validators.required])

    return formGroup;
  }

  async login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm?.get('email')?.value!, this.loginForm.get('password')?.value!).then(cred => {
        this.dialog.open(PopupComponent, {
          width: '50%',
          height: '20%',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '750ms',
          data: {
            title: "Sikeres bejelentkezés!",
          }
        })
        this.router.navigateByUrl("/main");
      }).catch(error => {
        console.log(error);
      })
    }
  }

    protected readonly getErrorMessage = getErrorMessage;
}
