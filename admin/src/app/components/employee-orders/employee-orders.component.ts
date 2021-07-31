import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.scss']
})
export class EmployeeOrdersComponent implements OnInit {
datasource:any;employeeorder;  p: number = 1;
return;
  constructor(private orders:EmployeeService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show()
    this.orders.order().subscribe(data=>{
      this.datasource=data;
      console.log("da",data)
      this.datasource.forEach(element=>{
      if(element.payment === null){
      this.return = "Return";
    //  console.log(this.return)
      }
      })
      this.datasource.forEach(async element=>{
      if(element.notes === null || element.notes === ""){
      this.employeeorder = "No notes";
    //  console.log(JSON.stringify(element.notes))
      }else{
        // console.log(element.notes)
      }
      })
     //console.log(data);
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
