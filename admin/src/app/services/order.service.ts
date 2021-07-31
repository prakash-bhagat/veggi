import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
url= environment.SERVER_URL;

  constructor(private http:HttpClient) { }
  adminUpdate(data){
    return this.http.post(`${this.url}/admin/adminUpdate`,data);
  }
  deliveryStatus(){
    return this.http.get(`${this.url}/admin/deliveryStatus`);
  }
}
