import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
url=environment.SERVER_URL;
  constructor(private http:HttpClient) { }
  insert(data){
    return this.http.post(`${this.url}/admin/newsociety`,data);
  }
  update(info){
    return this.http.post(`${this.url}/admin/updatesociety`,info)
  }
}
