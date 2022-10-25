import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrls: ['./booked-rooms.component.css'],
})
export class BookedRoomsComponent implements OnInit {
  orders: any;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
     this.orderService.getAllOrders().subscribe((data: any) => {
       this.orders = data;
       console.log('CHECKING Orders 000000', this.orders);
       console.log('CHECKING Orders firstNmae 000000', this.orders.endDate);
     });
  }
}
