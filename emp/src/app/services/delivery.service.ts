import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  url = environment.SERVER_URL;
private content = new BehaviorSubject<any>('Null');
public shared = this.content.asObservable();
  constructor(private http: HttpClient) { }
//private data = new BehaviorSubject<any>()
  singleDelivery(orderId:any){
   return this.http.get(`${this.url}/employee/order/`+orderId)
    }
    empDelivery(data){
      return this.http.post(`${this.url}/employee/deliver`,data)
    }

    return(data){
      return this.http.post(`${this.url}/employee/notdelivered/return`,data)
    }
}
