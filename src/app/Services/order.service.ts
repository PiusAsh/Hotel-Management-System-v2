import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, PayOrder } from '../Models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}
  createOrder(order: Order) {
    this.getUserFromLocalStorage();
    return this.http.post<Order>(
      this.baseApiUrl + '/Order/AddOrder',
      order
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseApiUrl + '/Order/AllOrders'
    );
  }

  getOrdersByUser(id: any): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseApiUrl + '/Order/GetAllUserOrders?userId=' + id
    );
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(
      this.baseApiUrl + '/Order/DeleteOrder?Id=' + id
    );
  }

  searchByPaymentId(searchParam: any): any {
    return this.http.get(
      `${this.baseApiUrl}/Order/searchPaymentId?search=${searchParam}`
      // JSON.stringify(searchParam)
    );
  }

  private setUserLocalStorage(payOrder: PayOrder) {
    localStorage.setItem('PayOrder', JSON.stringify(payOrder));
  }
  private getUserFromLocalStorage(): PayOrder {
    const userJson = localStorage.getItem('payOrder');
    if (userJson) return JSON.parse(userJson) as PayOrder;
    return new PayOrder();
  }
  getOrderByUser() {}
}
