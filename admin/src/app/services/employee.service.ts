import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
url = environment.SERVER_URL;
  constructor(private http:HttpClient) { }

  add(data){
    return this.http.post(`${this.url}/admin/addemployee`,data)
  }
  list(){
    return this.http.get(`${this.url}/admin/employeelist`)
  }
  delete(mobile){
    return this.http.post(`${this.url}/admin/delemployee`,mobile)
  }
  order(){
    return this.http.get(`${this.url}/admin/employeeOrder`)
  }
  assignorders(employeedata){
    return this.http.post(`${this.url}/admin/assignOrders`,employeedata);
  }
employeAssignOrders(){
  return this.http.get(`${this.url}/admin/employeAssignOrders`);
}

}
