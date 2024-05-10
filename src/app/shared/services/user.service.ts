import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public collectionName = "Users"
  constructor(private afs: AngularFirestore) { }

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user)
  }
  find(){}
  delete(userid: string){
    return this.afs.collection<User>(this.collectionName).doc(userid).delete();
  }
}
