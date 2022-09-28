import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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

  user: User[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private http: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // this.http.Userlogin().subscribe((res: any) => {
    //   console.log(res);
    //   this.user = res;
    // });

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

  Userlogin() {
    console.log(this.loginForm.value);
  }
}
