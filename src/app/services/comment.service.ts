import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firestore: AngularFirestore) {}

  addComment(postId: string, parentCommentId?: string, replyText?:string, commentForm?: any): Promise<any> {
    if (parentCommentId) {
      const comment = {
        postId,
        replyText: replyText,
        createdAt: new Date()
      };
      return this.firestore.collection(`posts/${postId}/comments/${parentCommentId}/replies`).add(comment);
    } else {
      const comment = {
        postId,
        commentText: commentForm.value.commentText,
        email: commentForm.value.email,
        name: commentForm.value.name,
        createdAt: new Date()
      };  
      return this.firestore.collection(`posts/${postId}/comments`).add(comment);
    }
  }
  getReplies(postId: string, commentId: string): Observable<any[]> {
    return this.firestore.collection(`posts/${postId}/comments/${commentId}/replies`).valueChanges();
  }
  // getComments(postId: string): Observable<any[]> {
  //   return this.firestore.collection(`posts/${postId}/comments`).valueChanges();
  // }
  getComments(postId: string): Observable<any[]> {
    return this.firestore.collection(`posts/${postId}/comments`).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
