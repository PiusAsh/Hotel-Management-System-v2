import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Models/room';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css'],
})
export class HotelRoomsComponent implements OnInit {
  rooms: Room[] = [];
  p: number = 1;
  collection!: any[];
  cartQuantity = 0;
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
    isAdmin: false,
  };
  constructor(
    private roomService: RoomService,
    private cartService: CartService,
    private userService: UserService,
    private route: Router
  ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    userService.userObservable.subscribe((newUser) => {
      this.globaluser = newUser;

      this.userService.getUserById(this.globaluser.userData).subscribe({
        next: (res) => {
          this.resp = res;
          console.log('Checking current user', this.resp.firstName);
          console.log('Checkin--- user', newUser);
        },
      });
    });
  }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe((res: any) => {
      this.rooms = res;
      console.log('CHECKING ROOMS', this.rooms);
    });
  }

  logout() {
    this.userService.logout();
    this.route.navigate(['login']);
    window.location.reload();
    // this.cartQuantity = 0;
  }
  get isAuth() {
    return this.resp;
  }
}
