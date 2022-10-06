import { Room } from "./room";

export class CartItem{
    constructor(public room: Room) {}
   days: number = 1;
   price: number = this.room.roomPrice;
}