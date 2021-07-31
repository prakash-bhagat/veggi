import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private serverUrl = environment.SERVER_URL;
  
  constructor(private http: HttpClient) { }
  
  getOrder(data) {
    return this.http.post<ProductResponseModel[]>(this.serverUrl + '/users/user',data);
  }
  singleDelivery(orderId:any){
    return this.http.get(`${this.serverUrl}/users/order/`+orderId)
     }
  // ELEMENT_DATA: PeriodicElement[] = [
  //   {id: 1, date: Date.now(), total: 100},
  //   {id: 2, date: Date.now(), total: 10},
  // ];
}
interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
// export interface PeriodicElement {
//   id: number;
//   date: number;
//   total: number;
// }