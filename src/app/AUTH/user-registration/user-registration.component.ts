import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  registerForm!: FormGroup;

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
    state: '',
    country: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    isAdmin: false
  };

  loginResponse: LoginResponse = {
    Message: '',
    userData: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,

          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  //     Register() {
  //   this.http.Register(this.user).subscribe((res: any) => {
  //     this.user = res;
  //     this.registerForm.reset();
  //     this.route.navigate(['login']);
  //     console.log(res);
  //   });
  // }

  Register() {
    this.user = this.registerForm.value;
    this.http.register(this.user).subscribe((res: any) => {
      this.loginResponse = res;
      this.registerForm.reset();
      console.log('******return login', this.loginResponse);
      console.log('******return1', res);
      // this.route.navigate(['user/:id']);
       this.route.navigate(['login']);
    },
    );
  }

  register(){
    this.user = this.registerForm.value;
    this.http.register(this.user).subscribe({

    })
  }
}



