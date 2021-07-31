import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
public view = new Subject<any>();

  setView(){
    // const data = JSON.parse()
  //  console.log(JSON.parse(localStorage.getItem("cart_Items")))
    this.view.next(JSON.parse(localStorage.getItem("cart_Items")))
  }
  getView(): Observable<any>{
    return this.view.asObservable();
  }

}
