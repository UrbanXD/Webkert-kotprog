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
import {PopupComponent} from "../../shared/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../shared/services/user.service";
import {GasmeterService} from "../../shared/services/gasmeter.service";
import {Gasmeter} from "../../shared/models/Gasmeter";

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
  constructor(private router: Router, private dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private gasmeterService: GasmeterService){ }

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
      this.authService.register(this.registerForm?.get('email')?.value, this.registerForm.get('password')?.value).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.registerForm?.get('email')?.value,
          firstname: this.registerForm?.get('firstname')?.value,
          lastname: this.registerForm?.get('lastname')?.value,
        }
        const gasmeter: Gasmeter = {
          id: '',
          userid: user.id as string,
          currentState: 0
        }
        this.userService.create(user).then(_ => {
          this.dialog.open(PopupComponent, {
            width: '50%',
            height: '20%',
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '750ms',
            data: {
              title: "Sikeres regisztráció!",
              content: "A(z) " + user.email + " címmel sikeres regisztrációt hajtott végre!"
            }
          })

          this.gasmeterService.create(gasmeter).catch(error => {
            console.log(error);
          })

        }).catch(error => {
          console.log(error);
        })

        this.router.navigateByUrl("/main");
      }).catch(error => {
        console.log(error);
      })
    }
  }

  protected readonly getErrorMessage = getErrorMessage;
}
