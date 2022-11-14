import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
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
  p: number = 1;
  collection!: any[];
  constructor(
    private toast: NgToastService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data;
      console.log('CHECKING Orders 000000', this.orders);
      console.log('CHECKING ORDER USER 000000', this.orders);
    });
  }
  deleteOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe({
      next: (response) => {
        window.location.reload();
        this.toast.success({
          detail: 'Order Deleted Successfully',
          duration: 5000,
        });
      },
      error: (errors) => {
        console.log(errors, 'CHECKING ERRORS-----');
        this.toast.error({
          detail: 'Oops! An error occurred',
          summary: 'Please try again later',
          duration: 4000,
        });
      },
    });
  }
}
