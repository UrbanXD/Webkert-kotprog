import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './not-found.component';
import {MatAnchor} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../main/main.component";

const routes: Routes = [{ path: '', component: NotFoundComponent }]

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatAnchor
  ]
})
export class NotFoundModule { }
