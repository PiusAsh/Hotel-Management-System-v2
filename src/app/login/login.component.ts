import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { LoginResponse, User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  IsSubmitted = false;

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
  };
  loginResponse: LoginResponse = {
    Message: '',
    userData: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private http: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,

          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  Login() {
    this.user = this.loginForm.value;
    this.IsSubmitted = true;
    this.http.LoginUser(this.user).subscribe((res: any) => {
      this.loginResponse = res;
      // localStorage.setItem('user', JSON.stringify(this.user));
      console.log('******return1', res);
      //this.loginForm.reset();
      // this.route.navigate(['user/:id']);
      this.route.navigate([`user/${this.loginResponse.userData}`]);
    });
  }

  // Login() {
  //   setTimeout(() => {
  //     console.log(this.user);
  //     this.http.LoginUser(this.user).subscribe({
  //       next: (response) => {
  //       alert(response.id)
  //       this.route.navigate([`user/${response.id}`])
  //       },
  //     });
  //   }, 1500);
  // }
}
