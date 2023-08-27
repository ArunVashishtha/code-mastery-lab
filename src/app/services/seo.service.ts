import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private maxLength = 300;
  constructor(
    private title: Title,
    private meta: Meta) { }
  
  setSEOTags(title: string, description: string) {
    this.title.setTitle(title);
    const truncatedString = description?.substring(
      0,
      this.maxLength
    );
    if (description) {
      this.meta.removeTag("name='description'");
      this.meta.addTag({ name: 'description', content: truncatedString +'...' });
    }
  }
}
