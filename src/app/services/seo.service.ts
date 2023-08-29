import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private maxLength = 300;
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc:any) { }
  
  setSEOTags(title: string, description: string) {
    this.title.setTitle(title);
    const truncatedString = description?.substring(
      0,
      this.maxLength
    );
    if (description) {
      this.meta.removeTag("name='description'");
      this.meta.addTag({ name: 'description', content: truncatedString +'...' });
    } else {
      this.meta.removeTag("name='description'");
      this.meta.addTag({ name: 'description', content: title +'...' });
    }
    this.createLinkForCanonicalURL(title);
  }
  
  createLinkForCanonicalURL(title: string) {
    this.destroyLinkForCanonicalURL();
     let link: HTMLLinkElement = this.doc.createElement('link');
     link.setAttribute('rel', 'canonical');
     this.doc.head.appendChild(link);
     link.setAttribute('href', this.doc.URL+'/'+title);
   }
  destroyLinkForCanonicalURL() {
    const els = this.doc.querySelectorAll('link[rel=\'canonical\']');
    for (let i = 0, l = els.length; i < l; i++) {
      const el = els[i];
      el.remove();
    }
  }
}
