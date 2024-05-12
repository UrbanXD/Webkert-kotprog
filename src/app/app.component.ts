import {Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import firebase from 'firebase/compat';
import {Router} from "@angular/router";
import {UserService} from "./shared/services/user.service";
import {GasmeterService} from "./shared/services/gasmeter.service";
import {GasmeterStatesService} from "./shared/services/gasmeter-states.service";
import {PopupComponent} from "./shared/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Webkert-kotprog';
  loggedInUser?: firebase.User | null;
  constructor(private router: Router, private dialog: MatDialog,private authService: AuthService, private userService: UserService, private gasmeterService: GasmeterService, private gasmeterStatesService: GasmeterStatesService) { }

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe({
      next: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.loggedInUser = user;
      },
      error: (error) => {
        localStorage.setItem("user", JSON.stringify(null));
        this.loggedInUser = null;
      }
    })
  }

  onToggleSideNav(event: any, sideNav: MatSidenav){
    if(event === true){
      sideNav.toggle();
    }
  }

  onClose(event: any, sideNav: MatSidenav){
    if(event === true){
      sideNav.close();
    }
  }

  logout(_?: boolean){
    this.authService.logout();
    this.router.navigateByUrl("/main");
  }

  deleteUser(userid: string){
    this.userService.delete(userid).then(_ => {
      this.authService.delete().then(_ => {
        this.dialog.open(PopupComponent, {
          width: '50%',
          height: '20%',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '750ms',
          data: {
            title: "Sikeres felhasználó törlés!",
          }
        });
        this.gasmeterService.deleteByUserID(userid).then(_ => {
          this.gasmeterService.getByUserID(userid).subscribe({
            next: gasmeterid => {
              this.gasmeterStatesService.deleteByGasmeterID(gasmeterid).then(_ => {
              }).catch(_ => {
                //
              })
            },
            error: _ => {
              //
            }
          })
        }).catch(_ => {
          //
        });
      }).catch(_ => {
        this.dialog.open(PopupComponent, {
          width: '50%',
          height: '20%',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '750ms',
          data: {
            title: "Sikertelen felhasználó törlés!",
          }
        });
      });
    }).catch(_ => {
      this.dialog.open(PopupComponent, {
        width: '50%',
        height: '20%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '750ms',
        data: {
          title: "Sikertelen felhasználó törlés!",
        }
      });
    });
    this.router.navigateByUrl("/main");
  }
}
