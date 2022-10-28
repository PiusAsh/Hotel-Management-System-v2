import { CartItem } from "./CartItem";
import { Room } from "./room";
import { User } from "./user";

export class Order{
    id!: number;
    items!: CartItem[];
    totalPrice!: number;
    firstName!: string;
    lastName!: string;
    address!: string;
    email!: string;
    phone!: string;
    paymentId!: string;
    bookDate!: string;
    endDate!: string;
    status!: string;
}
export class UserBooking {
  id!: number;
  room!: Room;
  roomPrice!: number;
  firstName!: string;
  lastName!: string;
  phone!: string;
  payment_Id!: string;
  bookDate!: string;
  endDate!: string;
  status!: string;
  days!: number;
  user!: User;
  userRooms!: any
}