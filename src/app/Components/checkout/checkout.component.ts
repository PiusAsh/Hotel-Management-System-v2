import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/Models/order';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order();
checkoutForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private cartService: CartService) { 
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

  }

  ngOnInit(): void {
    // let {name, address, email, phoneNo} = this.userService.currentUser()

  }
  createOrder(){
    if(this.checkoutForm.invalid){
      alert("Please fill the inputs");
      return;
    }
  }

}
