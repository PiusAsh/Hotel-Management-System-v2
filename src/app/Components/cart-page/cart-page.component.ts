import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
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
cartItem!: CartItem;
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

  public startDate!: AbstractControl;
  public checkOutDate!: AbstractControl;

  public form!: FormGroup;
  constructor(
    private cartService: CartService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private userService: UserService,
    private toast: NgToastService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    this.form = this.fb.group({
      startDate: [''],
      checkOutDate: [''],
    });
  }

  ngOnInit(): void {
    let dt = new Date();

    this.form.patchValue({
      startDate: this.format(dt),
    });

    // console.log('checking start date', gd);
  }

  startDt(value: any) {
    let dt = new Date();
    let dt2 = new Date(value);

    if (dt2 < dt) {
      this.form.patchValue({
        startDate: this.format(dt),
      });
      this.toast.info({
        detail: 'Invalid Date',
        summary: "Book date cannot be less than today's date",
        duration: 3000,
      });
      // alert("Start date cannot be less than today's date");
    }
  }

  format(dateValue: any) {
    let month = '' + (dateValue.getMonth() + 1);
    let day = '' + dateValue.getDate();
    const year = dateValue.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${year}-${month}-${day}`;
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.room.id);
    this.toast.success({
      detail: 'Cart Update',
      summary: 'Room has been removed successfully',
      duration: 3000,
    });
  }

  changeDays(cartItem: CartItem) {
    const days = this.form.value.startDate.substring(8);

    const days2 = this.form.value.checkOutDate.substring(8);

    let difference = days2 - days;

    // let TotalDays = (days - days2) / (1000 * 3600 * 24);
    // alert(difference);

    this.cartService.changeDays(cartItem.room.id, difference);
    this.toast.success({
      detail: 'Duration Update',
      summary: 'Count changed',
      duration: 3000,
    });
  }
}
