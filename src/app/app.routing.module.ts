import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthGuard} from "./shared/services/auth.guard";


const routes: Routes = [
  {
    path: '', redirectTo: "/main", pathMatch: "full"
  },
  {
    path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [AuthGuard]
  },
  {
    path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule), canActivate: [AuthGuard]
  },
  { path: 'my-gasmeter', loadChildren: () => import('./pages/my-gasmeter/my-gasmeter.module').then(m => m.MyGasmeterModule), canActivate: [AuthGuard] },
  {
    path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
