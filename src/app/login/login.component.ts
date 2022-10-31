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
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Loading...' | 'Login' = 'Login';
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
    isAdmin: false,
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

  changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Login' ? 'Loading...' : 'Login';
    if (mode === 'edit') {
      console.log('UPDATING USER INFO');
    }
  }

  Login() {
    this.user = this.loginForm.value;
    this.IsSubmitted = true;
    this.http.LoginUser(this.user).subscribe((res: any) => {
      this.loginResponse = res;
      console.log('******return1', res);
      //this.loginForm.reset();
      // if(this.user.isAdmin == true){
      //   this.route.navigate([`admin/${this.loginResponse.userData}`]);
      // }else{

      //   this.route.navigate([`user/${this.loginResponse.userData}`]);
      // }
      // this.route.navigate([`user/${this.loginResponse.userData}`]);
    });
  }
}
