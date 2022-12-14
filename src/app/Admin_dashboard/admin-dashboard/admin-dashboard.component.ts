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
    // bookDate: '',
    // endDate: '',
    status: '',
    payOrder: [],
  };

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
  // paymentId: any;

  public loginame: string = '';
  checkout: any;
  duration: any;
  justDate: any;
  userRoomRecord: any;
  RecordRoom: any[] = [];
  today: any;
  allDue: any

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
      // this.order = data;

      
      for (let i = 0; i < this.orders.length; i++) {
        this.userRoomRecord = this.orders[i];
// this.allDue = this.orders.checkOutDate[i];
        const date2 = new Date(this.orders[i].startDate);
        let xx = date2
          .setDate(date2.getDate() + this.orders[i].days)
          .toString();

        this.userRoomRecord.CheckOutDate = xx;
        let fg = [];

        fg.push(this.userRoomRecord);
        let ss = Object.assign(fg)[0];
        console.log('***', fg);

        this.RecordRoom.push(ss);
        
        //console.log('*', this.RecordRoom);

        console.log('***RECORD ROOM', this.RecordRoom);
        console.log('***ALL DUE', this.allDue);
      }
      

      this.today = new Date();
      this.duration = this.orders[0].days;
      const date = new Date();
      this.justDate = date.setDate(date.getDate() + this.duration).toString();

      console.log(this.justDate, 'CHECKING DATE ----');
      console.log(this.duration, 'CHECKING DURATION');

      console.log('CHECKING Orders 000000', this.orders);
      // console.log('CHECKING Orders firstName 000000', this.orders.endDate);

          // this.allDue = this.orders[0].checkOutDate;
          // console.log('ALL DUE', this.allDue);
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

  deleteOrder(id: any) {
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
  }

  PaymentSearch(value: any): any {
    this.orderService.searchByPaymentId(value).subscribe((res: any) => {
      this.orders = res;
      this.p = 1;
    });
  }
}
