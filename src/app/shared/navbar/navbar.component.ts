import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // @Input() sidenav: MatSidenav | null = null;
  @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();
  toggle(){
    this.onToggleSideNav.emit(true);
  }
}
