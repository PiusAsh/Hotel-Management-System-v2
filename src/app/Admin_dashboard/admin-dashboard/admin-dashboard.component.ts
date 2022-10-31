import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Order } from 'src/app/Models/order';
import { Room } from 'src/app/Models/room';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  user: User[] = [];
  rooms: Room[] = [];
  orders: any;
  order: Order = {
    id: 0,
    items: [],
    totalPrice: 0,
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    paymentId: '',
    bookDate: '',
    endDate: '',
    status: '',
    payOder: []
  }
  
  userDetails: User = {
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
  Trans1: number = 0;
  p: number = 1;
  collection!: any[];

  public loginame: string = '';
  constructor(
    private http: UserService,
    private roomService: RoomService,
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toast: NgToastService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          let num = parseInt(id);
          this.userService.getUserById(num).subscribe({
            next: (res) => {
              this.userDetails = res;

              this.loginame = this.userDetails.firstName;
              console.log('res %%%%%%%%%', res);
              this.route.navigate([`admin/${res.id}`]);
            },
          });
        }
      },
    });
    this.http.getAllUsers().subscribe((data: any) => {
      this.user = Array.from(Object.keys(data), (k) => data[k]);
    });

    this.roomService.getAllRooms().subscribe((res: any) => {
      this.rooms = res;
    });

    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data;
      console.log('CHECKING Orders 000000', this.orders);
      console.log('CHECKING Orders firstNmae 000000', this.orders.endDate);
    });
  }

  getUserId(id: any) {
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.route.navigate([`admin/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
    console.log(this.user);
  }
  updateUser() {
    this.userService
      .updateUser(this.userDetails.id, this.userDetails)
      .subscribe({
        next: (response) => {
          console.log(response, 'CHECKING RESPONSE-----');
          this.toast.success({
            detail: 'Updated Successfully',
            summary: 'Profile Info Updated',
            duration: 5000,
          });
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

   deleteOrder(id: any){
    this.orderService.deleteOrder(id).subscribe({
      next: (response) => {
        window.location.reload();
        this.toast.success({
          detail: 'Order Deleted Successfully',
          duration: 5000,
        });

      },
      error: (errors) => {
        console.log(errors, 'CHECKING ERRORS-----');
        this.toast.error({
          detail: 'Oops! An error occurred',
          summary: 'Please try again later',
          duration: 4000,
        });
      },
    });
  }}
