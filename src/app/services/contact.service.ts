import { Injectable, InjectionToken } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
export const CONTACT_SERVICE_TOKEN = new InjectionToken<ContactService>('contactService');
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private backendUrl = 'your-backend-api-url'; // Replace with your actual backend API URL

  constructor(private afs:AngularFirestore) { }
  addContactFormSubmission(data: any): Promise<any> {
    return this.afs.collection('contactFormSubmissions').add(data);
  }
}
