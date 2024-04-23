import {Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import firebase from 'firebase/compat';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Webkert-kotprog';
  loggedInUser?: firebase.User | null;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe(user => {
      localStorage.setItem("user", JSON.stringify(user));
      this.loggedInUser = user;
    }, error => {
      this.loggedInUser = null;
      localStorage.setItem("user", JSON.stringify('null'));
    });
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
}
