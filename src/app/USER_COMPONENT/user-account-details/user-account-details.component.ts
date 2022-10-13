import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['./user-account-details.component.css'],
})
export class UserAccountDetailsComponent implements OnInit {
  

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

  

  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}



  

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              console.log('User Res %%%%%%%%%', res);
              // this.route.navigate([`account-details/${res.id}`]);
            },
          });
        }
      },
    });
  }

  updateUser(){
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response) => {
        this.route.navigate(['account-details'])
        console.log(response, "CHECKING RESPONSE")
        alert("User Updated Successfully");
      }
    })
  }
  getUserId(id: any) {
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        // this.route.navigate([`user/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
    console.log(this.user);
  }
}
