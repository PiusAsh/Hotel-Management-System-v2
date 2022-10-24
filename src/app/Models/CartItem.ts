import { Room } from "./room";

export class CartItem {
  constructor(public room: Room) {}
  days = 1;
  price = parseInt(this.room.roomPrice.toString())
//   bookDate!: string;
//   checkoutDate!: string;
}