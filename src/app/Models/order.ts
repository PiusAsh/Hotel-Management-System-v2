import { CartItem } from "./CartItem";

export class Order{
    id!: number;
    items!: CartItem[];
    totalPrice!: number;
    name!: string;
    address!: string;
    email!: string;
    phone!: string;
    paymentId!: string;
    bookedDate!: string;
    status!: string;
}