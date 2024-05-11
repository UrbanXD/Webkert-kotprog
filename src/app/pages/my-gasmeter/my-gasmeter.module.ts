import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyGasmeterComponent } from './my-gasmeter.component';
import { FlexModule } from "@angular/flex-layout";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MyPaginatorIntl} from "../../shared/classes/MyPaginatorIntl";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AppModule} from "../../app.module";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";


const routes: Routes = [
  { path: '', component: MyGasmeterComponent }
];

@NgModule({
  declarations: [
    MyGasmeterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIconButton,
    MatSuffix,
    MatButton,
    DateFormatPipe
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MyPaginatorIntl },
    DateFormatPipe
  ],
})
export class MyGasmeterModule { }
