import { DatePipe } from '@angular/common';
import { Room } from './room';

export class CartItem {
  constructor(public room: Room) {}
  days = 1;
  price = parseInt(this.room.roomPrice.toString());
  startDate = new Date;
  // startDate = new Date().toDateString();
  checkOutDate!: number;
  // date = this.checkOutDate.toLocaleString();
}
