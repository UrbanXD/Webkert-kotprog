import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";
import {Gasmeter} from "../models/Gasmeter";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GasmeterService {
  public collectionName = "Gasmeters"
  constructor(private afs: AngularFirestore) { }

  create(gasmeter: Gasmeter) {
    gasmeter.id = this.afs.createId();
    return this.afs.collection<Gasmeter>(this.collectionName).doc(gasmeter.id).set(gasmeter)
  }

  getByUserID(userid: string){
    return this.afs.collection<Gasmeter>(this.collectionName, ref => ref.where("userid", "==", userid)).get().pipe(map((querySnapshot) => {
      return querySnapshot?.docs[0]?.id ? querySnapshot.docs[0].id : "-1";
    }))
  }

  find(){}

  update(gasmeter: Gasmeter) {
    return this.afs.collection<Gasmeter>(this.collectionName).doc(gasmeter.userid).update({currentState: gasmeter.currentState})
  }

  deleteByUserID(userid: string) {
    return this.getByUserID(userid).forEach(d => {
      return this.afs.collection<Gasmeter>(this.collectionName).doc(d).delete();
    })
  }
}
