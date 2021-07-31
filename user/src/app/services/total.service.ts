import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  public view = new Subject<any>();
  data;

  setView(c){
   // console.log(c)
    // const data = JSON.parse()
    // console.log(JSON.parse(localStorage.getItem("cart_Items")))
    this.data = JSON.parse(localStorage.getItem("cart_Items"));
    const chk:boolean= this.data.find(items=>{
      return items.id == c
    });
    let subtotal=0;
    if(chk){
      this.data.find(items=>{
        if(items.id==c){
          // items.quantity--;
          // this.subtotal =0;
          subtotal += items.quantity * items.price;
         
    //      console.log(subtotal);
        }
      })
    }
    
    // let subtotal = 0;
    //   this.data.id.forEach(element => {
    //     subtotal += element.quantity * element.price;
    //   });
    //   console.log(subtotal)
      this.view.next(subtotal) ;
  }
  getView(): Observable<any>{
    return this.view.asObservable();
  }
}
