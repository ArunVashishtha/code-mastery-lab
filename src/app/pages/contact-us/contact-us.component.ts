import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONTACT_SERVICE_TOKEN, ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [{ provide: CONTACT_SERVICE_TOKEN, useClass: ContactService }]
})
export class ContactUsComponent {
  contactForm: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {      
      this.contactService.addContactFormSubmission(this.contactForm.value).then(
        response => {
          this.submitted = true;
        },
        error => {
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
}
