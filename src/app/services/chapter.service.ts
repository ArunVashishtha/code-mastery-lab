import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chapter } from '../models/chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  chapters!: Array<Chapter>;
  constructor(private firestore: AngularFirestore) {}

  getChaptersByCategoryId(categoryId: string): Observable<any[]> {
    return this.firestore
      .collection('chapters', (ref) => ref.where('category.id', '==', categoryId).where('isFeatured', '==', true).orderBy('chapterNumber'))
      .valueChanges();
  }

  getChapterContentById(chapterId: string): Observable<any> {
    return this.firestore.collection('chapters').doc(chapterId).valueChanges();
  }
}
