/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  //: [AuthService],
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup | any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     this.signupForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.signupForm.value.username);
    console.log(this.signupForm.value.password);

  //  this.authService.signupUser(this.signupForm.value.username, this.signupForm.value.password);
  }
}