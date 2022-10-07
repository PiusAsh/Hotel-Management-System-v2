import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../Models/cart';
import { CartItem } from '../Models/CartItem';
import { Room } from '../Models/room';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(room: Room):void{
    let cartItem = this.cart.items.find(item => item.room.id === room.id)
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(room));
    this.setCartToLocalStorage();
  }

  // I USED NUMBER INSTEAD OF A STRING
  removeFromCart(roomId: number): void{
    this.cart.items = this.cart.items.filter(item => item.room.id != roomId);
    // this.userService.logout();
    this.setCartToLocalStorage();
  }

  changeDays(roomId: number, duration: number){
    let cartItem = this.cart.items.find(item => item.room.id === roomId);
    if(!cartItem)
     return;
     cartItem.days = duration;
     cartItem.price = duration * cartItem.room.roomPrice;
     this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }
  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.days, 0)
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
