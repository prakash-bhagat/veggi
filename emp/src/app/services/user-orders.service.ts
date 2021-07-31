import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {
url = environment.SERVER_URL;

  constructor(private http:HttpClient) { }
  usersorders(employee_id){
    return this.http.post(`${this.url}/employee/getOrders`,employee_id)
  }
  deliverOrdersSearch(orderId){
    return this.http.post(`${this.url}/employee/order`,orderId)
  }
}
