import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore,
    private router: Router) { }

  loadFeatured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt').limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }

  loadCategory(categoryId: string) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }

  loadSinglePost(postId: string) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilarPost(catId: string) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', catId).limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }

  countViews(postId: string) {
    const docRef = this.afs.collection('posts').doc(postId);

    // Update the field using FieldValue.increment
    docRef.update({
      views: firebase.default.firestore.FieldValue.increment(1)
    });
  }
}
