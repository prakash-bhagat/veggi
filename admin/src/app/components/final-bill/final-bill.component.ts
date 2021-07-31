import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-final-bill',
  templateUrl: './final-bill.component.html',
  styleUrls: ['./final-bill.component.scss']
})
export class FinalBillComponent implements OnInit {
  p: number = 1;
  datasource;dateFormat;

  constructor(private userService:UserService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show()
    this.userService.finalOrders().subscribe(data=>{
      this.datasource=data;
      // console.log(data);
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    },err=>{
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    })
   
  }

}
