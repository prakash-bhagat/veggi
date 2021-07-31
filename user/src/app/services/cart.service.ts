import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';
import {CartModelPublic, CartModelServer} from '../models/cart.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';
import {ProductModelServer} from '../models/product.model';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import { fadeInItems } from '@angular/material/menu';
import { DropdownService } from './dropdown.service';
import { AddCartChangeService } from './add-cart-change.service';
import { Plugins,PushNotification,PushNotificationToken,
  PushNotificationActionPerformed, } from '@capacitor/core';

  const {PushNotifications} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem = [ ]
  total=[];
  data;
  fcmSendToken;
  private serverURL = environment.SERVER_URL;

  constructor(private http: HttpClient,
              private productService: ProductService,private change: AddCartChangeService,
              private orderService: OrderService,
              private router: Router,
              private toast: ToastrService,
              private spinner: NgxSpinnerService,
              private dropdown:DropdownService) {
                const cartitem = JSON.parse(localStorage.getItem("cart_Items"));
                this.cartItem = cartitem == null ? [] : cartitem;
              }

  AddProductToCart(p: any) {
    // console.log(p);
    if(this.cartItem.length === 0){
      p.quantity = 1;
      this.cartItem.push(p)
      localStorage.setItem('cart_Items', JSON.stringify(this.cartItem));
      this.toast.success(`${p.name} New to the cart`, 'Product Added', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }else{
      const chk:boolean= this.cartItem.find(items=>{
        return items.id == p.id
      });
        if(chk){
      // console.log("hdsfjdhf");
      this.cartItem.find(items=>{
        if(items.id == p.id){
          items.quantity++;
        }
      }); 
      localStorage.setItem('cart_Items', JSON.stringify(this.cartItem)); 
      this.toast.success(`${p.name} Updated to the cart`, 'Product Update', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });  
      
        }  else{
          // console.log("yyyyyyy");
          p.quantity = 1
          this.cartItem.push(p)
          localStorage.setItem('cart_Items', JSON.stringify(this.cartItem))
          this.toast.success(`${p.name} added to the cart`, 'Product Added', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
        
    }
}
Checkout(data){
  // console.log(data)
  // this.spinner.show();
  this.http.post(`${this.serverURL}/orders/payment`, null).subscribe((res: { success: boolean }) => {
    // console.log("res",res);
    if(res.success===true){
    //  console.log("success",res.success);
      this.data = JSON.parse(localStorage.getItem("cart_Items"));
      const products = [];
      let total = 0;
      this.data.forEach(element => {
        let test={
          id: element.id,
          incart: element.quantity,
          price: element.price,
        }
        products.push(test);
        total += element.quantity * element.price;
      });  
this.http.post(`${this.serverURL}/orders/new`, {
                userId: data.id,
                products: products,
                total: total,
                notes: data.notes,

              }).subscribe((data:any)=>{
                // console.log("cart services",data.success)
                if(data.success === true){
          //      console.log(data);
                window.localStorage.removeItem('cart_Items')
                this.dropdown.setView();
                this.router.navigateByUrl('/thankyou');
                window.location.reload();
                }else{
                  this.router.navigateByUrl('/fail')
                }
              })
              
              
    }else{
      this.router.navigateByUrl('/fail')
     
    }
  })
}

// ischange() {
//   const  changeStatus ={
//     change:false
//   }
//   this.change.changeMessage(changeStatus)
//   return localStorage.removeItem('access_token');
// }

}

