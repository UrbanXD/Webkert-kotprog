import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GasmeterStatesService} from "../../shared/services/gasmeter-states.service";
import {AuthService} from "../../shared/services/auth.service";
import {GasmeterService} from "../../shared/services/gasmeter.service";
import {GasmeterState} from "../../shared/models/GasmeterState";
import {DatePipe} from "@angular/common";
import {getErrorMessage} from "../../shared/constants";
import {User} from "../../shared/models/User";
import {FormBuilder, Validators} from "@angular/forms";
import {PopupComponent} from "../../shared/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

@Component({
  selector: 'app-my-gasmeter',
  templateUrl: './my-gasmeter.component.html',
  styleUrl: './my-gasmeter.component.scss'
})
export class MyGasmeterComponent {
  loggedInUser?: firebase.User | null;

  lastChanged ?: GasmeterState | null;

  displayedColumns: string[] = ['date', 'state'];
  dataSource = new MatTableDataSource<any>([]);

  stateForm = this.createForm({
    state: 0
  });

  createForm(model: {state: number}){
    let formGroup = this.formBuilder.group(model);
    formGroup.get('state')?.addValidators([Validators.required, Validators.maxLength(10)])

    return formGroup;
  }

  // User11@gmail.com

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage.getItem("user") as string);

    const data = this.gasmeterService.getByUserID(this.loggedInUser?.uid ? this.loggedInUser.uid : "-1");
    data.subscribe({
      next: (gasmeterid) => {
        this.gasmeterStatesService.getLastChangedInGasmeterID(gasmeterid).subscribe({
          next: value => {
            this.lastChanged = value[0];
          },
          error: error => {
            console.log(error);
          }
        })

        this.gasmeterStatesService.getAllByGasmeterID(gasmeterid).subscribe({
          next: value => {
            this.dataSource.data = [];
            value.forEach(gasmeter => {
              let asd: any[] = this.dataSource.data;
              asd.push({
                date: this.datePipe.transform(gasmeter.date.toDate(), "yyyy/MM/dd HH:mm")?.toString(),
                state: gasmeter.state
              });
              this.dataSource.data = asd;
            })
          },
          error: error => {
            console.log(error);
          }
        })
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private dialog: MatDialog, private gasmeterService: GasmeterService, private gasmeterStatesService: GasmeterStatesService) {}

  addState(){
    if(this.stateForm.valid){
      this.dialog.open(PopupComponent, {
        width: '50%',
        height: '20%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '750ms',
        data: {
          title: "Biztos benne, hogy felviszi az adatot?",
          accept: () => {
            this.gasmeterService.getByUserID(this.loggedInUser?.uid as string).subscribe({
              next: value => {
                const gasmeterState: GasmeterState = {
                  gasmeterid: value,
                  state: this.stateForm.get('state')?.value!,
                  date: firebase.firestore.Timestamp.fromDate(new Date())
                }
                this.gasmeterStatesService.create(gasmeterState).then(_ => {
                  console.log("ADDVA");
                }).catch(error => {
                  console.log(error);
                })
              },
              error: error => {
                console.log(error)
              }
            })
          }
        }
      })
    }
  }

  formatState(){
    return this.lastChanged?.state?.toString().padStart(10, '0').split('');
  }

  protected readonly Date = Date;
  protected readonly getErrorMessage = getErrorMessage;
}
