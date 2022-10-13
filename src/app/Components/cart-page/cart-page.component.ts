import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/CartItem';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;

  // user: User = {
  //   id: 0,
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phoneNo: '',
  //   address: '',
  //   state: '',
  //   country: '',
  //   password: '',
  //   dateOfBirth: '',
  //   gender: '',
  // };

  constructor(
    private cartService: CartService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService, private toast: NgToastService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe({
    //   next: (params) => {
    //     const id: any = params.get('id');
    //     if (id) {
    //       this.userService.getUserById(id).subscribe({
    //         next: (res) => {
    //           this.user = res;
    //           console.log('%%%%%%%%%', res);
    //           this.route.navigate([`user/${res.id}`]);
    //         },
    //       });
    //     }
    //   },
    // });
  }

  // getUserId(id: any) {
  //   this.userService.getUserById(id).subscribe({
  //     next: (res) => {
  //       this.route.navigate([`user/${res.id}`]);
  //       this.route.navigate([`user`]);
  //       console.log(res);
  //     },
  //   });
  //   console.log(this.user);
  // }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.room.id);
    this.toast.success({detail: "Cart Update", summary: "Room has been removed successfully", duration: 3000})
  }

  changeDays(cartItem: CartItem, daysInString: string) {
    const days = parseInt(daysInString);
    this.cartService.changeDays(cartItem.room.id, days);
    this.toast.success({
      detail: 'Duration Update',
      summary: 'Count changed', duration: 3000,
    });
  }
}
