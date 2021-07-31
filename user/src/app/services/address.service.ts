import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient) { }
  
  addUpdate(data){
    return   this.http.post(`${this.SERVER_URL}/products/updateAddress`,data);
  
  }
  getInfo(address){
    return this.http.get(`${this.SERVER_URL}/auth/users`,address);
  }
}
