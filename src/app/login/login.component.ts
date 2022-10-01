import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { User } from '../Models/user';
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
    Id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: 0,
    address: '',
    state: '',
    country: '',
    password: '',
    dateOfBirth: '',
    gender: ''
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
    this.http.LoginUser(this.user).subscribe({
      next: (res) => {
        this.user = res;
        console.log(res);
        this.route.navigate(['user']);
      },
    });
  }
}
