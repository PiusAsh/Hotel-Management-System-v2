import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Room } from 'src/app/Models/room';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';
import { IRoom } from 'src/app/Shared/IRoom';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
})
export class ViewRoomComponent implements OnInit {
  room: Room = {
    roomName: '',
    roomPrice: 0,
    roomDes: '',
    id: 0,
    roomImg: '',
    roomType: '',
  };

  globaluser: any;
  resp: any;
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
  // room: Room[] = [];
  // room!: Room;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private route: Router,
    private cartService: CartService,
    private userService: UserService, private toast: NgToastService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.globaluser = newUser;

      this.userService.getUserById(this.globaluser.userData).subscribe({
        next: (res) => {
          this.resp = res;
          console.log(
            'Checking current  that added to cart',
            this.resp.firstName
          );
          console.log('Checkin--- user that added item to cart', newUser);
        },
      });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.roomService.GetRoomById(id).subscribe({
            next: (res) => {
              this.room = res;
              console.log('res %%%%%%%%%', res);
              this.route.navigate([`room/${res.id}`]);
            },
          });
        }
      },
    });
  }
  getRoomId(id: any) {
    this.roomService.GetRoomById(id).subscribe({
      next: (res) => {
        this.route.navigate([`room/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
    console.log(this.room);
  }

  addToCart() {
    if(this.isAuth){

      this.cartService.addToCart(this.room);
      this.route.navigateByUrl('/cart-page');
    }else{
      this.toast.error({detail: "You're not logged in..", summary: "Please login to proceed", duration: 4000})
      this.route.navigateByUrl('/login');
    }
  }

  get isAuth() {
    return this.resp;
  }
}
