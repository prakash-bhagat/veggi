import {Component, OnInit} from '@angular/core';
import {CartService} from '@app/services/cart.service';
import {OrderService} from '@app/services/order.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '@app/models/cart.model';
import {UserService} from '@app/services/user.service';
import { SocketioService } from '@app/services/socketio.service';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartTotal: number;
  cartData: CartModelServer;
  userId;
  checked: boolean = false;
  cart: any;
  data:any;brief=[];
  subtotal: number = 0;
  notesGroup:FormGroup;
  listServiceFeature=[];
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,private toast: ToastrService,
              private userService: UserService,
              private spinner: NgxSpinnerService,private fb:FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem("cart_Items"));
    this.cart.forEach(element => {
        this.subtotal += element.quantity * element.price
    });
    this.userService.userData$.subscribe(data => {
      // @ts-ignore
      this.userId = JSON.parse(localStorage.getItem('access_token'));
    });
  }

  onCheckout() {
    let m ={
  mobile:this.userId.mobile
  }
this.userService.getnumber(m).subscribe(data=>{
let mob = data[0].mobile;
  if(mob != 1){
  this.toast.error("Your account has been removed", "Register again")
  }else{
if (this.cart !== null) {
      this.brief.push(this.listServiceFeature);
      let data={
        id: this.userId.id,
        notes: this.listServiceFeature
      }
      // console.log("data",data)
      this.router.navigateByUrl('/wait',{skipLocationChange: true});
      this.spinner.show();
        this.cartService.Checkout(data);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
    } else {
      return;
    }
  }
})
  }
  
  notification(){
   // console.log('message')
  }
}
