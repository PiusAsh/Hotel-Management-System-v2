import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}
  createOrder(order: Order) {
    return this.http.post<Order>(this.baseApiUrl + '/Order/AddOrder', order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseApiUrl + '/Order/AllOrders');
  }

  getOrderByUser(){
    
  }
}
