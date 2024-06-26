import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../services/auth.service";
import {user} from "@angular/fire/auth";
import firebase from "firebase/compat";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() loggedInUser?: firebase.User | null;
  @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  @Output() onDeleteUser: EventEmitter<string> = new EventEmitter();

  toggle(){
    this.onToggleSideNav.emit(true);
  }

  logout(){
    this.onLogout.emit(true);
  }

  deleteUser(){
    this.onDeleteUser.emit(this.loggedInUser?.uid as string)
  }
}
