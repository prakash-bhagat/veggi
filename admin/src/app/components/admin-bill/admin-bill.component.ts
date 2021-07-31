import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admin-bill',
  templateUrl: './admin-bill.component.html',
  styleUrls: ['./admin-bill.component.scss']
})
export class AdminBillComponent implements OnInit {
 @ViewChild('closebutton',{static:true}) closebutton;

datasource;
p:number = 1;
assign: FormGroup;
employeelist;box;employeAssignOrders;
  constructor(private orders:UserService,private fb:FormBuilder,private employee:EmployeeService
    ,private toast:ToastrService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.assign= this.fb.group({
      employee_id: ['',Validators.required],
      order_id: ['',Validators.required],
    })
    this.employee.list().subscribe(list=>{
      this.employeelist =list;
      // console.log(this.employeelist)
      // this.assign.controls['name'].setValue(this.employeelist.name);
    })
    this.employee.employeAssignOrders().subscribe(list=>{
      this.employeAssignOrders =list;
      // console.log('list',list)
      // this.assign.controls['name'].setValue(this.employeelist.name);
    })
this.spinner.show()
    this.orders.adminBill().subscribe(data=>{
      if(data){
        this.datasource =data;
        // console.log(data)
        setTimeout(() => {
          /** spinner ends after 3 seconds */
          this.spinner.hide();
        }, 3000);
      }else{
        // this.message="No Orders"
      }
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    },err=>{
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    });
  }

  onAssign(){
    console.log(this.assign.value);
    this.spinner.show();
    this.closebutton.nativeElement.click()
    this.employee.assignorders(this.assign.value).subscribe(data=>{
            console.log("deleted",data);
        this.toast.success("Order Assigned");
        setTimeout(() => {
          /** spinner ends after 3 seconds */
          this.spinner.hide();
        }, 3000);
       window.location.reload();
        },error=>{this.toast.error("Order Not Assigned");
        setTimeout(() => {
          /** spinner ends after 3 seconds */
          this.spinner.hide();
        }, 3000);
      window.location.reload();  
      });
         this.assign.reset();
      }
}
