import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
 message: string;
 orderId: number;
 products: ProductResponseModel[] = [];
 cartTotal: number;
  myUser: any;
  constructor(private router: Router,
              private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      message: string,
      products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    /* this.message = state.message; */
   /*  this.products = state.products;
    console.log(this.products); */
    // this.orderId = state.orderId;
    // console.log(this.orderId)
   /*  this.cartTotal = state.total; */



  }

  ngOnInit(): void {
    this.myUser = JSON.parse(localStorage.getItem('access_token'));
    
  //  console.log(this.myUser.id)
  }
  

}

interface ProductResponseModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantityOrdered: number;
}
