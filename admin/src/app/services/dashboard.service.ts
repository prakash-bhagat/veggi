import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
url=environment.SERVER_URL;
  constructor(private http:HttpClient) { }
  dailyOrders(){
    return this.http.get(`${this.url}/admin/dailyorder`)
  }
  totalusers(){
    return this.http.get(`${this.url}/admin/totalusers`)
  }
  totalemployee(){
    return this.http.get(`${this.url}/admin/totalemployee`)
  }
  society(){
    return this.http.get(`${this.url}/admin/society`)
  }
  analytics(society){
    return this.http.post(`${this.url}/admin/analytics`,society)
  }
  carousel(data){
    return this.http.post(`${this.url}/admin/carousel`,data);
  }
  getCarousel(){
    return this.http.get(`${this.url}/admin/getCarousel`)
  }
  delCarousel(id){
    return this.http.post(`${this.url}/admin/delCarousel`,id)
  }
}
