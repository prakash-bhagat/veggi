import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  private SERVER_URL = environment.SERVER_URL;  

  constructor(private httpClient:HttpClient) { }

  userInfo(){
    this.httpClient.get(`${this.SERVER_URL}/auth/users/`)
    .subscribe((data:any) => {
   //   console.log(localStorage.setItem)
      return localStorage.setItem('info', data);
      
       
    });
  }
  getInfo() {
    return localStorage.getItem('info');
  }
}

export interface ResponseModel {
  role: any;
  token: string;
  auth: boolean;
  mobile: number;
  name: string;
  address:string;
  userId: number;
}