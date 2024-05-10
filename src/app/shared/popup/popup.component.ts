import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Popup} from "../models/Popup";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  data?: Popup;
  ngOnInit(){
    this.data = this.popupData
  }
  constructor(@Inject(MAT_DIALOG_DATA) public popupData: Popup, private ref: MatDialogRef<PopupComponent>) {}
  close(){
    this.ref.close();
  }
}
