import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  @Output() onCloseSideNav: EventEmitter<boolean> = new EventEmitter();

  close(){
    this.onCloseSideNav.emit(true);
  }
}
