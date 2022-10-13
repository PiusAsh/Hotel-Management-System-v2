import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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
    isAdmin: false
  };
  constructor(
    private cartService: CartService,
    private userService: UserService, private route: Router
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

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
    this.route.navigate(['login']);
    // this.cartQuantity = 0;
  }

  get isAuth() {
    return this.resp;
  }
}
