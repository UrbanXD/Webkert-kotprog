import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Gasmeter} from "../models/Gasmeter";
import {map} from "rxjs";
import {GasmeterState} from "../models/GasmeterState";

@Injectable({
  providedIn: 'root'
})
export class GasmeterStatesService {
  public collectionName = "GasmeterStates"
  constructor(private afs: AngularFirestore) { }

  create(gasmeterState: GasmeterState){
    gasmeterState.id = this.afs.createId();
    return this.afs.collection<GasmeterState>(this.collectionName).doc(gasmeterState.id).set(gasmeterState);
  }

  update(gasmeterid: string, newState: number){
    return this.getLastChangedInGasmeterID(gasmeterid).forEach(value => {
        return this.afs.collection<GasmeterState>(this.collectionName).doc(value[0].id).update({state: newState});
    });
  }

  getLastChangedInGasmeterID(gasmeterid: string){
    return this.afs.collection<GasmeterState>(this.collectionName, ref => ref.where("gasmeterid", "==", gasmeterid).limit(1).orderBy("date", "desc")).valueChanges();
  }
  getAllByGasmeterID(gasmeterid: string){
    return this.afs.collection<GasmeterState>(this.collectionName, ref => ref.where("gasmeterid", "==", gasmeterid).orderBy("date", "desc")).valueChanges();
  }

  getDocByGasmeterID(gasmeterid: string){
    return this.afs.collection<GasmeterState>(this.collectionName, ref => ref.where("gasmeterid", "==", gasmeterid)).get().pipe(map((querySnapshot) => {
      return querySnapshot.docs[0].id;
    }))
  }

  deleteByGasmeterID(gasmeterid: string){
    return this.getDocByGasmeterID(gasmeterid).forEach(d => {
      return this.afs.collection<GasmeterState>(this.collectionName).doc(d).delete();
    })
  }
}
