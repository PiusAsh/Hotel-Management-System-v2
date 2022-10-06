import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/CartItem';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) =>{
      this.cart = cart;
    })
   }

  ngOnInit(): void {
  }
removeFromCart(cartItem: CartItem){
  this.cartService.removeFromCart(cartItem.room.id);
}

changeDays(cartItem: CartItem, daysInString: string){
  const days = parseInt(daysInString);
  this.cartService.changeDays(cartItem.room.id, days)
}
}
