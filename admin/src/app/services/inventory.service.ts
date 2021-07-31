import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
url=environment.SERVER_URL
  constructor(private http:HttpClient) { }
  addFruits(image){
   return this.http.post(`${this.url}/products/addfruit`,image);
  }
  addDairy(image){
    return this.http.post(`${this.url}/products/adddairy`,image);
   }
  addVegetables(image){
    return this.http.post(`${this.url}/products/addvegetable`,image)
  }
  updateInventory(data){
    return this.http.post(`${this.url}/admin/updateInventory`,data);
  }
}
