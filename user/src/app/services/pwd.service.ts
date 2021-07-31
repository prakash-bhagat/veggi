import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PwdService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient) { }
  
  pwdUpdate(data){
    return   this.http.post(`${this.SERVER_URL}/users/updatePassword`,data);
      };
}
