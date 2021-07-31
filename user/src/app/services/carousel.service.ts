import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
url=environment.SERVER_URL
  constructor(private http:HttpClient) { }
   //  get carousel
   getCarousel(){
    return this.http.get(`${this.url}/admin/getCarousel`)
  }
}
