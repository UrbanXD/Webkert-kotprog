import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import {RouterModule, Routes} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";

const routes: Routes = [{ path: '', component: MainComponent }]
console.log(typeof routes)

@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexModule
    ]
})
export class MainModule { }
