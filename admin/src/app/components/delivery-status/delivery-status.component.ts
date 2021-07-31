import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.scss']
})
export class DeliveryStatusComponent implements OnInit {

datasource;
p: number = 1;

  constructor(private order:OrderService,private spinner: NgxSpinnerService,) { }
  

  ngOnInit(): void {
    this.spinner.show()
    this.order.deliveryStatus().subscribe((data:any)=>{
      this.datasource= data
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      // console.log(this.datasource.orderStatus.data[0]);
      
      
    },err=>{
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    })
  }
  // ngAfterViewInit() {
  //   this.datasource.paginator = this.paginator;
  // }
  

}
