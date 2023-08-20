import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  constructor(private firestore: AngularFirestore) {}

  getChaptersByCategoryId(categoryId: string): Observable<any[]> {
    return this.firestore
      .collection('chapters', (ref) => ref.where('category.id', '==', categoryId).where('isFeatured', '==', true))
      .valueChanges();
  }

  getChapterContentById(chapterId: string): Observable<any> {
    return this.firestore.collection('chapters').doc(chapterId).valueChanges();
  }
}
