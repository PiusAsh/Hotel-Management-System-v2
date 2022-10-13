import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}
  createOrder(order: Order) {
    return this.http.post<Order>(this.baseApiUrl + '/Order/CreateOrder', order);
  }
}
