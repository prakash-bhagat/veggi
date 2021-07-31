import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
url = environment.SERVER_URL
  
constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(`${this.url}/employee/emplogin`,data)
  }
}
