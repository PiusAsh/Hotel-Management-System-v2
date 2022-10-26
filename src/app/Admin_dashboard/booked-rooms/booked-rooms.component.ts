import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrls: ['./booked-rooms.component.css'],
})
export class BookedRoomsComponent implements OnInit {
  orders: any;
  order: Order | undefined;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
     this.orderService.getAllOrders().subscribe((data: any) => {
       this.orders = data;
       console.log('CHECKING Orders 000000', this.orders);
       console.log('CHECKING ORDER USER 000000', this.orders);
     });
  }
}
