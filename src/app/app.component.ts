import { Component } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Webkert-kotprog';

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
}
