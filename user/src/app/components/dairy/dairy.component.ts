import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../services/product.service';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropdownService } from '@app/services/dropdown.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dairy',
  templateUrl: './dairy.component.html',
  styleUrls: ['./dairy.component.scss']
})
export class DairyComponent implements OnInit {
  products;prod=[];incart;changeDetect;cart;disableminus:boolean=false;
  apiUrl= environment.IMAGE_URL;localData;cartData;
  constructor(private cartService: CartService,private dropdown: DropdownService,private toast: ToastrService,
    private productService: ProductService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    
    let aa=JSON.parse(localStorage.getItem("cart_Items"));
    // console.log(aa.length)
    if(aa==null){
    //  console.log("null")
  }else{
    this.localData = JSON.parse(localStorage.getItem("cart_Items"));
      this.localData.forEach(element => {
        this.cartData=element;
        this.changeDetect= element.id
        this.cart=element
      //  console.log(this.cartData.id)
      });
    
  }
    this.productService.getProductsDairy().subscribe((prods: ServerResponse) => {
      this.spinner.show();
      this.products = prods.products;
      // console.log(prods)
      prods.products.forEach(element => {
        if (element.packet >= 999) {
         try{ this.prod.push(element);}catch(err){console.log(err)}
          // console.log("prod",element.packet)
          // console.log(this.prod);
        }else{
          // console.log("not prod",element.packet)
        }
      });
      setTimeout(() => {
        /** spinner ends after 1 seconds */
        this.spinner.hide();
      }, 1000);
     // console.log(this.products)
    },err=>{
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);
  });
    

  }

  change(p,i,event){
    if(event.target.value){
      this.changeDetect = i;
  }
  }

  AddToCart(p:any,i) {
    this.incart = JSON.parse(localStorage.getItem("cart_Items"));
    if (!this.incart) {
  this.cartService.AddProductToCart(p);
  this.dropdown.setView();
  this.cart = p;
      this.changeDetect = p.id;
     
    }else{
      const chk:boolean= this.incart.find(items=>{
        return items.id == p.id
      });
      if(chk){
    this.incart.find(item=>{
      if(p.id==item.id){
        this.cart= item;
      }
    })
    this.changeDetect = p.id;
    this.dropdown.setView();
  }else{
    const chk:boolean= this.incart.find(items=>{
      return items.id != p.id
    });
    if(chk){
      this.incart.find(item=>{
          if(p.id!=item.id){
            p.quantity = 1
            this.cart=p
          }
        })
        this.incart.push(p);
        localStorage.setItem('cart_Items', JSON.stringify(this.incart))
    this.changeDetect = p.id;
      this.dropdown.setView();
      this.toast.success(`${p.name} added to the cart`, 'Product Added', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
}
  }
    }
}

  plus(c,event){
    let inCart = JSON.parse(localStorage.getItem("cart_Items"));
    inCart.find(items=>{
       if(items.id==c.id){
         items.quantity++;
         this.cart = items
       }
     })
     localStorage.setItem('cart_Items',JSON.stringify(inCart));
     this.dropdown.setView();
 }
 minus(c,event){
  let inCart = JSON.parse(localStorage.getItem("cart_Items"));
    inCart.find(items=>{
       if (items.quantity >=2 && items.id == c.id) {
         items.quantity--;
         this.cart = items
       }else{
         this.disableminus = true;
       } 
     })
     localStorage.setItem('cart_Items',JSON.stringify(inCart));
     this.dropdown.setView();
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
let item = JSON.parse(localStorage.getItem("cart_Items"));
if(item.length==1){
  localStorage.removeItem("cart_Items");
  this.dropdown.setView();
  location.reload();
  this.ngOnInit();
}else{
  this.removeByAttr(item, 'id', c.id);
}  
}

}
