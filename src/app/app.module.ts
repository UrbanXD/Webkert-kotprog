import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app.routing.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MainComponent} from "./pages/main/main.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {CustomersModule} from "./customers/customers.module";
import {CustomersComponent} from "./customers/customers.component";
import {MatIconButton} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SideMenuComponent} from "./shared/side-menu/side-menu.component";
import {MatListModule} from "@angular/material/list";
@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    FlexLayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
