import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  isEmailAlreadyExist = false;
  isEmailSubscribed = false;
  constructor(private subService: SubscribersService) { }

  ngOnInit(): void {
  }
  onSubmit(formValue: any) {
    const data: Sub = {
      email: formValue.email,
      name: formValue.name
    }
    this.subService.checkSubs(data.email).subscribe(val => {
      if (val.empty) {
        this.isEmailAlreadyExist = false;
        this.isEmailSubscribed = true;
        this.subService.saveData(data);
      } else {
        this.isEmailSubscribed = false;
        this.isEmailAlreadyExist = true;
        console.log('Email already exist');
      }
    });
  }
}
