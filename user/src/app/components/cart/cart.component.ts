import {Component, OnInit, Inject} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import { UserService } from './../../services/user.service';
import { find, findIndex, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DropdownService } from '@app/services/dropdown.service';
import { fadeInItems } from '@angular/material/menu';
import { TotalService } from '@app/services/total.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  apiUrl= environment.IMAGE_URL;
  url = environment.SERVER_URL;
  cart: any;
  data: any;
  subtotal:any;
  sum;message:boolean;prod;
  

  constructor(public cartService: CartService, private http:HttpClient,private toast: ToastrService,
    private dropdown:DropdownService,private total:TotalService,private route:Router) {
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem("cart_Items"));
  
    this.data = this.cart;
    if(this.cart==null){
     // console.log("null")
    }else{
    this.cart.forEach(element => {
      if (element.packet >999) {
        this.prod = JSON.parse(JSON.stringify(element.packet/1000));
      }
    });
  }
    if(this.cart==null){
    }else{
    let total = 0
    this.message=false;
    this.data.forEach(element => {
      total += element.quantity * element.price;
    });  
    this.sum = total
  }
  }
  onChange(c,event){
    // console.log(c);
    
  }
  plus(c,event){
     const chk:boolean= this.cart.find(items=>{
      return items.id == c.id
    });
    if(chk){
      this.cart.find(items=>{
        if(items.id==c.id){
          items.quantity++;
        }
      })
      localStorage.setItem('cart_Items',JSON.stringify(this.cart));
      this.dropdown.setView();
      this.ngOnInit();
    }
    
  }
  minus(c,event){
    const chk:boolean= this.cart.find(items=>{
      return items.id == c.id
    });
    if(chk){
      this.cart.find(items=>{
        if (c.quantity >=2 && items.id == c.id) {
          items.quantity--;
        }
      })
      localStorage.setItem('cart_Items',JSON.stringify(this.cart));
      this.dropdown.setView();
      this.ngOnInit();
    }
  }
   removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    localStorage.setItem("cart_Items",JSON.stringify(arr))
    this.dropdown.setView();
    this.ngOnInit();
}
  delete(c){
    if(this.cart.length==1){
      this.sum= 0;
      localStorage.removeItem("cart_Items");
      this.dropdown.setView();
      location.reload();
      this.ngOnInit();
    }else{
      this.removeByAttr(this.cart, 'id', c.id);
    }  
  }

  checkout(c){
    this.route.navigateByUrl('/checkout');
  }

}
