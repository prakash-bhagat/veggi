import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {CartService} from '../../services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DropdownService } from '@app/services/dropdown.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TotalService } from '@app/services/total.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products;
  changeDetect;
  cart;cartData;localData
  incart;check;disableminus:boolean=false;
  prod=[];
  offer;checkoffer:boolean=false;
  first = 1;

apiUrl= environment.IMAGE_URL;
  constructor(private productService: ProductService,private toast: ToastrService,
              private cartService: CartService,
              private dropdown: DropdownService,
              private router: Router, private dom:DomSanitizer,
              private spinner: NgxSpinnerService,private total:TotalService) { }

  ngOnInit(): void {
    let aa=JSON.parse(localStorage.getItem("cart_Items"));
    if(aa==null){
  }else{
    this.localData = JSON.parse(localStorage.getItem("cart_Items"));
      this.localData.forEach(element => {
        this.cartData=element;
        this.changeDetect= element.id
        this.cart=element
      });
    
  }

    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.spinner.show();
      this.products = prods.products;
      this.products.c = false;
      // console.log(this.products)
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
        this.spinner.hide();
      }, 1000);

    },err=>{this.toast.error("Error while fetching")
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  });  
  }

  // selectProduct(id: number) {
  //   this.router.navigate(['/product', id]).then();
  // }

  AddToCart(p:any,i) {
    this.incart = JSON.parse(localStorage.getItem("cart_Items"));
    if (!this.incart) {
  this.cartService.AddProductToCart(p);
  this.cart = p;
      this.changeDetect = p.id;
      this.dropdown.setView();
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
          }
        })
        this.incart.push(p);
        localStorage.setItem('cart_Items', JSON.stringify(this.incart))
        this.cart=p;
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
   const chk:boolean= inCart.find(items=>{
     return items.id == c.id
   });
   if(chk){
    inCart.find(items=>{
       if (items.quantity >=2 && items.id == c.id) {
         items.quantity--;
         this.cart = items
         console.log("minus")
       }else{
         this.disableminus = true;
         console.log("minus true")
       } 
     })
     localStorage.setItem('cart_Items',JSON.stringify(inCart));
     this.dropdown.setView();
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
