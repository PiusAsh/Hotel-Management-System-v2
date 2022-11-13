import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, PayOrder } from 'src/app/Models/order';
import { User, UserItems } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import { PaystackOptions } from 'angular4-paystack';
import { OrderService } from 'src/app/Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
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
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  // open() {
  //    return this.isShown ? true : false;
  // }

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

    Swal.fire({
      title: 'Booked Successfully',
      text: 'Your room has been booked',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: ' #112A48',
      cancelButtonColor: ' #112A48',
      confirmButtonText: 'Print Receipt',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isShown = true;
        // open(){

        //   return this.isShown = true;
        // }
        // $('#offcanvasBtn').click();
        // this.route.navigate(['receipt'])
        // Swal.fire('Booked', 'Your room has been booked.', 'success');
        // this.open();
      }
    });

    // this.isShown = true;
    this.cartService.clearCart();

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
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              console.log('res00000 %%%%%%%%%', this.resp);
              console.log(' CHECKING THE ID000', this.resp.id);
            },
          });
        }
      },
    });

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
  goToUser() {
    if(this.resp.isAdmin == true){

      this.route.navigate([`admin/${this.resp.id}`]);
    }else{
      this.route.navigate([`user/${this.resp.id}`]);
    }
  }

  get checkout() {
    return this.checkoutForm.controls;
  }

  randNumber = Math.random().toString().replace('.', '1') + 10;

  createOrder() {
    if (this.checkoutForm.valid) {
      this.order.id = this.res.id;
      this.order.paymentId = 'ASH' + this.randNumber;
      this.order.address = this.res.address;
      this.order.email = this.res.email;
      this.order.firstName = this.res.firstName;
      this.order.lastName = this.res.lastName;
      this.order.phone = this.res.phoneNo;
      this.order.address = this.res.address;
      this.order.payOrder = this.order.payOrder;
      this.order.items = this.order.items;
      

      // this.PaystackOptions = {
      //   amount: 6000,
      //   email: this.order.email,
      //   ref: `${Math.ceil(Math.random() * 10e10)}`,
      // };
      // console.log('CHECKING ORDER EMAIL', this.order.email);
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
