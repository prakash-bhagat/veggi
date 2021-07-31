import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeliveryService } from 'src/app/services/delivery.service';
import { UserOrdersService } from '../../services/user-orders.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  value = 'Clear me';
  chk: any;
  panelOpenState=false;
  text;
  orderid;
  employee_id;

  constructor(private uo:UserOrdersService,private fetch:DeliveryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.refresh();
  }

refresh(){
  this.employee_id = JSON.parse(localStorage.getItem("auth"));
    const id ={
      id: this.employee_id[0].id
    }
    // console.log(id)
    this.spinner.show();
    this.uo.usersorders(id).subscribe(data=>{
      if(data){
      //   console.log("res",data);
      // console.log("Respones Time",Date.now());
      this.chk = data
      
      // console.log("SUCCESS DATA");
      
      }else{
        // console.log("res",data);
      // console.log("Respones Time",Date.now());
      
      // setTimeout(() => {
      //   /** spinner ends after 3 seconds */
      //   this.spinner.hide();
      // }, 3000);
      // console.log("NOT SUCCESS");
      
      }
    },error=>{ 
      // console.log("NOT SUCCESS",error);
      
    })
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
    // console.log("NOT SUCCESS");

    this.fetch.shared.subscribe(x=> this.text = x);
}

}
