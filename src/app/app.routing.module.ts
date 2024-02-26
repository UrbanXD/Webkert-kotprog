import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  {
    path: '', redirectTo: "/main", pathMatch: "full"
  },
  {
    path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {
    path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
