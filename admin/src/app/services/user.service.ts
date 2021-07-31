import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url = environment.SERVER_URL;
  constructor(private http:HttpClient,) { }
  allUsers(){
    return this.http.get(`${this.url}/users`)
  }
  allOrders(){
    return this.http.get(`${this.url}/admin/userOrders`)
  }
  adminBill(){
    return this.http.get(`${this.url}/admin/adminBill`)
  }
  delusers(mobile){
    return this.http.post(`${this.url}/admin/delusers`,mobile)
  }
singleDelivery(orderId:any){
    return this.http.get(`${this.url}/admin/order/`+orderId)
     }
updateDelivery(update){
       return this.http.post(`${this.url}/admin/updateDelivery`,update);
     }
invoice(orderId:any){
      return this.http.get(`${this.url}/admin/print/`+orderId)
       }
finalOrders(){
  return this.http.get(`${this.url}/admin/finalOrders`)
}
finalInvoice(orderId:any){
  return this.http.get(`${this.url}/admin/finalInvoice/`+orderId)
}
delete(orderId){
  return this.http.post(`${this.url}/admin/delOrders`,orderId)
}
}
