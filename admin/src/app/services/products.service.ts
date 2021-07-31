import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
url = environment.SERVER_URL;
  constructor(private http:HttpClient) { }
  inventory(){
    return this.http.get(`${this.url}/products`)
  }
  updateOffer(data){
    return this.http.post(`${this.url}/admin/updateOffer`,data)
  }
  delete(id){
    return this.http.post(`${this.url}/products/delfruit`,id)
  }
  instock(data){
    return this.http.post(`${this.url}/admin/inStock`,data)
  }
  outstock(data){
    return this.http.post(`${this.url}/admin/outOfStock`,data)
  }
}
