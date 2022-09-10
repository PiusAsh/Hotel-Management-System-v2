import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
registerForm! : FormGroup
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
      
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNo: ['', Validators.required, Validators.maxLength(11)],
    state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
    })
  }


  register(){

  }
}
