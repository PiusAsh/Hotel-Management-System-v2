import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/Models/order';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import { PaystackOptions } from 'angular4-paystack';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // PAYSTACK TESTING

  // END OF PAYSTACK TESTING
  order: Order = new Order();
  checkoutForm!: FormGroup;
  globaluser: any;
  uselocal: any;
  resp: any;
  res: any;

  login = {
    message: '',
    userData: 0,
  };

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

  reference = '';
  title = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private route: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  // PAYSTACK METHOD

  options: PaystackOptions = {
    amount: 50000,
    email: 'user@mail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`,
  };

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
  } //END OF PAYSTACK METHOD

  ngOnInit(): void {
    let { firstName, lastName, address, email, phoneNo } =
      this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      firstName: [firstName],
      lastName: [lastName],
      address: [address],
      email: [email],
      phoneNo: [phoneNo],
      // firstName: [firstName, Validators.required],
      // lastName: [lastName, Validators.required],
      // address: [address, Validators.required],
      // email: [email, Validators.required],
      // phoneNo: [phoneNo, Validators.required],
    });
    this.uselocal = localStorage.getItem('User');
    this.login = JSON.parse(this.uselocal);

    this.userService.getUserById(this.login.userData).subscribe({
      next: (res) => {
        this.resp = res;
        console.log('Checking current add------ user', this.resp);

        this.res = res;

        console.log('re', this.res);
        this.checkoutForm.patchValue({
          address: this.res.address,
          email: this.res.email,
          firstName: this.res.firstName,
          lastName: this.res.lastName,
          phone: this.res.phoneNo,
        });
      },
    });

    // this.order.address = this.res.address;
    // this.order.email = this.res.email;
    // this.order.firstName = this.res.firstName;
    // this.order.lastName = this.res.lastName;
    // this.order.phone = this.res.phoneNo;
  }

  get checkout() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.valid) {
      // this.user = this.res,
      // this.order.id
      // this.order.bookDate
      // this.order.checkoutDate
      // this.order.address = this.res.address;

      this.order.email = this.res.email;
      this.order.firstName = this.res.firstName;
      this.order.lastName = this.res.lastName;
      this.order.phone = this.res.phoneNo;
      this.order.address = this.res.address;
     


      console.log('CHECKING CHECKOUT PAGE', this.order);
      this.orderService.createOrder(this.order).subscribe(res =>{
        this.order = res;
        console.log("ORDER SERVICE",this.order);
      })
    }

    return;
  }
}
