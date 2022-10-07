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
    startDate!: string;
    endDate!: string;
    status!: string;
}