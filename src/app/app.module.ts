import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app.routing.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SideMenuComponent} from "./shared/side-menu/side-menu.component";
import {MatListModule} from "@angular/material/list";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {PopupComponent} from "./shared/popup/popup.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {DateFormatPipe} from "./shared/pipes/date-format.pipe";
@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NavbarComponent,
    PopupComponent
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
    MatDialogModule,
    FlexLayoutModule,
    MatListModule,
    AngularFireModule.initializeApp({
      "projectId": "webfejl-kotprog-2024",
      "appId": "1:1082888666344:web:04fce4b4b12dc29a7d9d5d",
      "storageBucket": "webfejl-kotprog-2024.appspot.com",
      "apiKey": "AIzaSyAdfvo_5fRpmK_jncaQQVKFDwpc8-lij6c",
      "authDomain": "webfejl-kotprog-2024.firebaseapp.com",
      "messagingSenderId": "1082888666344",
      "measurementId": "G-VK7JBFDFL0"
    }),
    // provideFirebaseApp(() => initializeApp({"projectId":"webfejl-kotprog-2024","appId":"1:1082888666344:web:04fce4b4b12dc29a7d9d5d","storageBucket":"webfejl-kotprog-2024.appspot.com","apiKey":"AIzaSyAdfvo_5fRpmK_jncaQQVKFDwpc8-lij6c","authDomain":"webfejl-kotprog-2024.firebaseapp.com","messagingSenderId":"1082888666344","measurementId":"G-VK7JBFDFL0"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatButton,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "webfejl-kotprog-2024",
      "appId": "1:1082888666344:web:04fce4b4b12dc29a7d9d5d",
      "storageBucket": "webfejl-kotprog-2024.appspot.com",
      "apiKey": "AIzaSyAdfvo_5fRpmK_jncaQQVKFDwpc8-lij6c",
      "authDomain": "webfejl-kotprog-2024.firebaseapp.com",
      "messagingSenderId": "1082888666344",
      "measurementId": "G-VK7JBFDFL0"
    })),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
