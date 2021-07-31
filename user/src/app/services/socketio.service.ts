import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  //readonly url:string="localhost:5000";

  constructor() { 
    //this.socket=io(this.url);
   }

  // listen(eventName){
  //   return new Observable((Subscriber)=>{
  //     this.socket.on(eventName,(data:any)=>{
  //       Subscriber.next(data);
  //     })
  //   })
  // }
  // emit(eventName,data){
  //   this.socket.emit(eventName,data);
  // }
}
