import { CartItem } from "./CartItem";
import { Room } from "./room";
import { User } from "./user";

export class Order {
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
  checkoutDate!: string;
  status!: string;
//   id!: number;
//   items!: CartItem[];
//   totalPrice!: number;
//   user!: User;
//   room!: Room;
//   paymentId!: string;
//   bookDate!: string;
//   checkoutDate!: string;
//   status!: string;
  // id!: number;
  // items!: CartItem[];
  // totalPrice!: number;
  // firstName!: string;
  // lastName!: string;
  // address!: string;
  // email!: string;
  // phone!: string;
  // paymentId!: string;
  // bookDate!: Date;
  // checkoutDate!: Date;
  // status!: string;
}

 