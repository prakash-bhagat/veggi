import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-invoice',
  templateUrl: './user-invoice.component.html',
  styleUrls: ['./user-invoice.component.scss']
})
export class UserInvoiceComponent implements OnInit {

  orderId;chk;
  dataloop;sum;prod=[];
  id;date;name;society_name;address;mobile
  constructor(private roo:ActivatedRoute,private fetch:UserService) { }

  ngOnInit(): void {
    this.roo.queryParams.subscribe(data=>{
      this.orderId=this.roo.snapshot.paramMap.get('orderId');
      this.fetch.invoice(this.orderId).subscribe(data=>{
        this.chk=data;
        this.id=this.chk[0].id;
        this.date=this.chk[0].date;
        this.name=this.chk[0].name;
        this.society_name=this.chk[0].society_name;
        this.address=this.chk[0].address;
        this.mobile=this.chk[0].mobile;
        this.chk.forEach(element => {
          if (element.packet >999) {
            try{ this.prod.push(element);}
            catch(err){console.log(err)};
            // console.log(this.prod)
          }
        });
        // console.log(this.chk);
        this.dataloop=this.chk;
      let total = 0
    this.dataloop.forEach(element => {
      // console.log(element.quantity)
      total += element.quantityOrdered * element.price;
    });  
    // console.log(total)
    this.sum = total  
      })
      // console.log(this.orderId);
    })
  }
  print(){
    window.print();
  }
}
