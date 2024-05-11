import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GasmeterStatesService} from "../../shared/services/gasmeter-states.service";
import {GasmeterService} from "../../shared/services/gasmeter.service";
import {GasmeterState} from "../../shared/models/GasmeterState";
import {getErrorMessage, StateValidator} from "../../shared/constants";
import {FormBuilder, Validators} from "@angular/forms";
import {PopupComponent} from "../../shared/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-my-gasmeter',
  templateUrl: './my-gasmeter.component.html',
  styleUrl: './my-gasmeter.component.scss'
})
export class MyGasmeterComponent {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  loggedInUser?: firebase.User | null;
  user?: User | null;
  lastChanged ?: GasmeterState | null;

  displayedColumns: string[] = ['date', 'state'];
  dataSource = new MatTableDataSource<any>([]);

  stateForm = this.createForm({
    state: 0,
    currentState: 0
  });

  createForm(model: any){
    let formGroup = this.formBuilder.group(model, {
      validator: StateValidator('state', 'currentState')
    });
    formGroup.get('state')?.addValidators([Validators.required, Validators.max(9999999999)])

    return formGroup;
  }

  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage.getItem("user") as string);
    this.userService.findByUserID(this.loggedInUser?.uid || "").subscribe({
      next: user => {
        if(user.length > 0){
          this.user = user[0];
        }else{
          this.user = {
            id: "-1",
            lastname: "John",
            firstname: "Doe",
            email: "unknown@gmail.com"
          }
        }
      }
    })

    const data = this.gasmeterService.getByUserID(this.loggedInUser?.uid ? this.loggedInUser.uid : "-1");
    data.subscribe({
      next: (gasmeterid) => {
        this.gasmeterStatesService.getLastChangedInGasmeterID(gasmeterid).subscribe({
          next: value => {
            if(value.length > 0){
              this.lastChanged = value[0];
            }else{
              this.lastChanged = {
                gasmeterid: "-1",
                state: 0,
              }
            }
            this.stateForm.get("currentState")?.setValue(this.lastChanged.state);
          },
          error: _ => {
            console.log("Sikertelen Gasmeter adat lekérés!");
          }
        })

        this.gasmeterStatesService.getAllByGasmeterID(gasmeterid).subscribe({
          next: value => {
            console.log("4")
            this.dataSource.data = [];
            value.forEach(gasmeter => {
              let asd: any[] = this.dataSource.data;
              asd.push({
                date: this.datePipe.transform(gasmeter?.date?.toDate())?.toString(),
                state: gasmeter.state
              });
              this.dataSource.data = asd;
            })
          },
          error: _ => {
            console.log("Sikertelen Gasmeter adat lekérés!");
          }
        })
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private datePipe: DateFormatPipe, private formBuilder: FormBuilder, private dialog: MatDialog, private userService: UserService, private gasmeterService: GasmeterService, private gasmeterStatesService: GasmeterStatesService) {}
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
            this.gasmeterService.getByUserID(this.loggedInUser?.uid as string).forEach(value => {
              const gasmeterState: GasmeterState = {
                gasmeterid: value,
                state: this.stateForm.get('state')?.value!,
                date: firebase.firestore.Timestamp.fromDate(new Date())
              }
              this.gasmeterStatesService.create(gasmeterState).then(_ => {
                this.dialog.open(PopupComponent, {
                  width: '50%',
                  height: '20%',
                  enterAnimationDuration: '500ms',
                  exitAnimationDuration: '750ms',
                  data: {
                    title: "Sikeres adatfelvitel!",
                    content: "Az Ön nevéhez tartozó e-gázóra állását frissítettük!"
                  }
                })
                this.stateForm.get('state')?.reset();
                this.stateForm.get('state')?.setErrors(null);
              }).catch(_ => {
                console.log("Sikertelen adat felvitel (Gasmeter State)!");
              })
            })
          }
        }
      })
    }
  }
  formatState(){
    return this.lastChanged?.state?.toString().padStart(10, '0').split('');
  }

  protected readonly getErrorMessage = getErrorMessage;
}
