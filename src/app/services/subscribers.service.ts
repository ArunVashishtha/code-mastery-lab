import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sub } from '../models/sub';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: AngularFirestore) { }

  saveData(subscriber: Sub) {
    this.afs.collection('subscribers').add(subscriber).then((docref) => {
      console.log('Data Insert Successfully ..!');
    });
  }

  checkSubs(subEmail:string) {
    return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get();
  }
}
