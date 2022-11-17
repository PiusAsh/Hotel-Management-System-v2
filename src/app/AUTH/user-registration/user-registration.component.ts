import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
    isAdmin: false,
  };

  loginResponse: LoginResponse = {
    Message: '',
    userData: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: UserService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,

            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
        password: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        phoneNo: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        address: ['', Validators.required],
      },
      {
        Validators: this.MustMatch('password', 'confirmPassword'),
      }
    );
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
    this.http.register(this.user).subscribe(
      (res: any) => {
        this.loginResponse = res;
        this.registerForm.reset();
        console.log('******return login', this.loginResponse);
        console.log('******return1', res);
        // this.route.navigate(['user/:id']);
        this.route.navigate(['login']);
      },
      (err) => {
        // alert("Something went wrong")
        this.toast.error({
          detail: err.error.message,
          // summary: 'Please try again later',
          duration: 4000,
        });
      }
    );
  }

  // register(){
  //   this.user = this.registerForm.value;
  //   this.http.register(this.user).subscribe({

  //   })
  // }

  MustMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[password];

      if (confirmPasswordControl.errors && !passwordControl.errors) {
        return;
      }
      if (passwordControl.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ MustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}



