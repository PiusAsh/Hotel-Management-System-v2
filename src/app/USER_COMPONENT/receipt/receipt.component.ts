import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaystackOptions } from 'angular4-paystack/lib/paystack-options';
import { NgToastService } from 'ng-angular-popup';
import { Order, PayOrder } from 'src/app/Models/order';
import { User, UserItems } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  // PAYSTACK TESTING
  options: PaystackOptions = {
    amount: 0,
    email: '',
    // email: this.UserStorageItems.email,
    ref: '',
  };

  myDate = Date.now();

  // END OF PAYSTACK TESTING
  order: Order = new Order();
  orderPay: PayOrder = new PayOrder();
  checkoutForm!: FormGroup;
  globaluser: any;
  uselocal: any;
  resp: any;
  res: any;

  globalemail = '';
  public UserKey: string = 'User';
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
    isAdmin: false,
  };
  UserStorageItems: UserItems = {
    message: '',
    userData: '',
    admin: false,
    email: '',
  };
  reff: PayOrder = {
    message: '',
    redirecturl: '',
    status: '',
    trans: '',
    transaction: '',
    trxref: '',
  };

  // message: any;
  // redirecturl: any;
  // status!: '';
  // trans!: '';
  // transaction!: '';
  // trxref!: '';

  reference = '';
  title = '';
  currentUser: any;
  isShown = false;

  // public PaystackOptions: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private route: Router,
    private toast: NgToastService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  open() {}

  // options: PaystackOptions = {
  //   amount: 50000,
  //   email: 'user@mail.com',
  //   ref: `${Math.ceil(Math.random() * 10e10)}`,
  // };
  // PAYSTACK METHOD
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successful';
    this.reff = ref;
    this.isShown === true;

    // this.isShown = true;
    // this.cartService.clearCart();

    // this.route.navigate(['/']);

    console.log(this.reff.trxref, 'CHECKING TRX-------');
    // this.route.navigate(['receipt']);

    console.log(ref, this.title, 'CHECKING SUCCESS');
    console.log(ref.trxref, 'CHECKING TRXREF====');

    if (ref.message === 'Approved') {
      this.createOrder();

      console.log(ref.status, 'CHECKING SUCCESS');
    }
  }

  paymentCancel() {
    this.toast.error({
      detail: 'Payment failed',
      summary: 'Please check your balance and try again',
      duration: 4000,
    });
    console.log('payment failed');
    console.log(this.title);
  }
  printReceipt() {
    window.print();
  }

  todayDate = Date.now();

  //END OF PAYSTACK METHOD
  ngOnInit(): void {
    this.currentUser = localStorage.getItem(this.UserKey);
    this.UserStorageItems = JSON.parse(this.currentUser);
    console.log(this.UserStorageItems.email, 'CHECKING EMAIL -----');

    this.options = {
      amount: this.order.totalPrice * 100,
      // email: 'as@gmail.com',
      email: this.UserStorageItems.email,
      ref: `${Math.ceil(Math.random() * 10e10)}`,
    };

    // PAYSTACK METHOD
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    // END OF PAYSTACK METHOD

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
        console.log(this.user.email, 'CHECKINGGGGG');
        this.globalemail = this.res.email;

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
  }

  get checkout() {
    return this.checkoutForm.controls;
  }
  receipt() {
    this.isShown = true;
  }
  createOrder() {
    if (this.checkoutForm.valid) {
      this.order.id = this.res.id;
      this.order.paymentId = '';
      this.order.address = this.res.address;
      this.order.email = this.res.email;
      this.order.firstName = this.res.firstName;
      this.order.lastName = this.res.lastName;
      this.order.phone = this.res.phoneNo;
      this.order.address = this.res.address;

      // this.PaystackOptions = {
      //   amount: 6000,
      //   email: this.order.email,
      //   ref: `${Math.ceil(Math.random() * 10e10)}`,
      // };
      console.log('CHECKING ORDER EMAIL', this.order.email);
      console.log('CHECKING ORDER', this.order);

      this.orderService.createOrder(this.order).subscribe({
        next: () => {
          // this.route.navigateByUrl('/receipt');
        },
        error: (errors) => {
          alert(errors.error);
        },
      });
    }
  }
}
