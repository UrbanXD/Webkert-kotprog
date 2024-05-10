import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  isUserLoggedIn(){
    return this.auth.user;
  }

  register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.auth.signOut();
  }

  delete(){
    return this.auth.currentUser.then(user => {
      user?.delete();
    })
  }
}
