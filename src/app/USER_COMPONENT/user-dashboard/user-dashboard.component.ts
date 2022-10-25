import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginResponse, User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
    private cartService: CartService, private toast: NgToastService
  ) {}

  ngOnInit(): void {

    
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              console.log('res %%%%%%%%%', res);
              this.route.navigate([`user/${res.id}`]);
            },
          });
        }
      },
    });
  }

  
  logout() {
    this.userService.logout();
    this.route.navigate(['login']);
    // this.cartQuantity = 0;
  }

  getUserId(id: any) {
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.route.navigate([`user/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
    console.log(this.user);
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response) => {
        console.log(response, 'CHECKING RESPONSE--ffgg---');
        this.toast.success({detail: "Updated Successfully", summary: "Profile Info Updated", duration: 5000})
      },
      error: (errors) =>{
        console.log(errors, 'CHECKING ERRORS-----');
this.toast.error({
  detail: 'Oops! An error occurred',
  summary: 'Please try again later',
  duration: 5000,
});
      }
    });
  }

 get isAuth(){
    return this.user;
  }
}
