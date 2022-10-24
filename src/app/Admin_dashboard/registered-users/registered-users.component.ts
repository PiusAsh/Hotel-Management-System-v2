import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginResponse, User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
})
export class RegisteredUsersComponent implements OnInit {
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
    isAdmin: true,
  };

  loginResponse: LoginResponse = {
    Message: '',
    userData: '',
  };

  users: User[] = [];
  constructor(
    private http: UserService,
    private route: Router,
    private formBuilder: FormBuilder, private toast: NgToastService
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
      isAdmin: [true],
    });

    this.http.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }

  deleteUser(id: any) {
    this.http.DeleteUser(id).subscribe({
      next: (response: any) => {
        // this.route.navigate(['dashboard']);
      },
    });
  }

  // deleteGuest(id: string) {
  //   this.http.DeleteUser(id).subscribe({
  //     next: (response: any) => {
  //     },
  //   });
  // }

  Register() {
    this.user = this.registerForm.value;
    //this.registerForm.value.isAdmin == true;
    console.log(this.registerForm.value, ' CHECKING USER');
    this.http.register(this.user).subscribe((res: any) => {
      this.loginResponse = res;
      this.registerForm.reset();

      console.log('******return login', this.loginResponse);
      console.log('******return1', res);
      this.route.navigate(['reg-users']);
    });
  }
}
