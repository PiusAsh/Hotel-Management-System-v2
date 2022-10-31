import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserBooking } from 'src/app/Models/order';
import { Room } from 'src/app/Models/room';
import { LoginResponse, User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
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
    isAdmin: false,
  };

  rooms: Room = {
    roomName: '',
    roomPrice: 0,
    roomDes: '',
    id: 0,
    roomImg: '',
    roomType: '',
  };
  recentRoom: any;
  orderCount: any;
  Booking: any;

  isShown = true;

  maxAge: Date | any;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit Info' = 'Edit Info';
  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toast: NgToastService,
    private orderService: OrderService
  ) {
    // const today = new Date();
    // this.maxAge = new Date(
    //   today.getFullYear() - 18,
    //   today.getMonth(),
    //   today.getDate()
    // );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              console.log('res %%%%%%%%%', res);
              console.log(' CHECKING THE ID', res.id);
            },
          });
          this.userService.GetUserOrder(id).subscribe({
            next: (res: any) => {
              console.log(res);
              this.recentRoom = res.recentRoom;
              this.orderCount = res.orderCount;
            },
          });
          this.orderService.getOrdersByUser(id).subscribe({
            next: (res: any) => {
              this.Booking = res;
              console.log(this.Booking, 'CHECKING USER ORDERS');
            },
          });
        }
      },
    });

  }


changeMode(mode?: 'edit' | 'locked'): void {
console.log(mode);
this.mode = this.mode === 'locked' ? 'edit' : 'locked';
this.buttonText = this.buttonText === 'Edit Info' ? 'Save Changes' : 'Edit Info';
if(mode === 'edit'){
  console.log('UPDATING USER INFO')
}
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
  getUserOrder(id: any) {
    this.userService.GetUserOrder(id).subscribe({
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
        if(this.mode === 'locked'){

          this.toast.success({
            detail: 'Updated Successfully',
            summary: 'Profile Info Updated',
            duration: 5000,
          });
        }
      },
      error: (errors) => {
        console.log(errors, 'CHECKING ERRORS-----');
        this.toast.error({
          detail: 'Oops! An error occurred',
          summary: 'Please try again later',
          duration: 5000,
        });
      },
    });
  }

  get isAuth() {
    return this.user;
  }






}
