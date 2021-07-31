import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '@app/services/history.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  myUser: any;
  chk:any;
  orderId: string;
  dataloop;sum;
  id;date;name;society_name;address;mobile

  constructor(private invoice:HistoryService,
    private roo: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId=this.roo.snapshot.paramMap.get('orderId');
    this.invoice.singleDelivery(this.orderId).subscribe(data=>{
      console.log(data)
      this.chk=data;
      this.id=this.chk[0].id;
      this.date=this.chk[0].date;
      this.name=this.chk[0].name;
      this.society_name=this.chk[0].society_name;
      this.address=this.chk[0].address;
      this.mobile=this.chk[0].mobile;
      this.dataloop=this.chk;
      let total = 0
    this.dataloop.forEach(element => {
      total += element.quantityOrdered * element.price;
    });  
    this.sum = total    
    });
  }
  getid(){
    this.myUser = JSON.parse(localStorage.getItem('access_token'));
  }

}
