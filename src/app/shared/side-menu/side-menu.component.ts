import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase/compat";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  @Input() loggedInUser?: firebase.User | null;
  @Output() onCloseSideNav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  close(){
    this.onCloseSideNav.emit(true);
  }

  logout(){
    this.onLogout.emit(true);
  }
}
