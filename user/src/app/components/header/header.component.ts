import {Component, OnInit} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DropdownService } from '@app/services/dropdown.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authState: boolean;
  isLoggedIn:boolean=false;
  logOut:any;
  isopen:boolean = false;
  apiUrl= environment.IMAGE_URL
  cart:any;
  items;
  total;
  sum;data;
  subtotal: number = 0;
  cartStatus:boolean= false;
  message;
  get;
  cartlength;forData;

  constructor(public cartService: CartService,
              public userService: UserService,
              private Dataservice: DataService,
              private dropdown: DropdownService,
              private router: Router,private toast: ToastrService
  ) {
  }
  // viewCart(){
  //   console.log(this.isopen);
    
  //   this.isopen = !this.isopen
  // }
  ngOnInit(): void {
    // this.dropdown.setView();
    this.cart = JSON.parse(localStorage.getItem("cart_Items"));
 
    this.dropdown.getView().subscribe((items:any)=>{
      this.cart = items;
      this.data = this.cart
      if(this.cart==null){
    //    console.log("null")
      } else{
      let total = 0
      this.data.forEach(element => {
        total += element.quantity * element.price;
      });  
      this.sum = total
    }
    }) 
    this.Dataservice.currentMessage.subscribe((data:any)=>{
      this.isLoggedIn = data.isLoggedIn;
      this.router.navigate(["default"]);

    })
  }
  logout() {
    const user=JSON.parse(localStorage.getItem('access_token'));
    let data={
      mobile : user.mobile,
    }
    // console.log(data)
    this.userService.disposeToken(data).subscribe((data:any)=>{
    //  console.log(data.affectedRows)
    //  if(data.affectedRows=== 1){
      this.logOut=this.userService.logout();
    this.toast.success("Logged Out")
    window.location.reload();
    this.router.navigateByUrl('login',{skipLocationChange:true})
    //  this.logOut=this.router.navigate(['default']);
    // }
    })
    
  } 
  viewCart(){
    if(this.cart === null){
      this.router.navigateByUrl('/empty');
    }else{
      this.router.navigateByUrl('/cart');
    }
  }
}
