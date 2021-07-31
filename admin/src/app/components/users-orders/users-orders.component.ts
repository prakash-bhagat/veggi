import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from '../../services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationWithDataComponent } from '../confirmation-with-data/confirmation-with-data.component';
import { UserInvoiceComponent } from '../user-invoice/user-invoice.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.scss']
})
export class UsersOrdersComponent implements OnInit {
  datasource:any;
  p:number = 1;
  checked:boolean=false;
  message;
  // @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  @ViewChild('closebutton') closebutton;
box;
  constructor(private orders:UserService, private employee:EmployeeService,private spinner: NgxSpinnerService,
       private fb:FormBuilder, private dialog: MatDialog,private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {
    this.spinner.show()
  this.orders.allOrders().subscribe(data=>{
    if(data){
      this.datasource =data;
      // console.log(data)
      
setTimeout(() => {
  /** spinner ends after 3 seconds */
  this.spinner.hide();
}, 3000);
    }else{
      this.message="No Orders"
      
setTimeout(() => {
  /** spinner ends after 3 seconds */
  this.spinner.hide();
}, 3000);
    }
  },err=>{
    
setTimeout(() => {
  /** spinner ends after 3 seconds */
  this.spinner.hide();
}, 3000);
  });
  
  //EMPLOYEE LIST

  }

  // invoice() {
  //   const dialogRef = this.dialog.open(UserInvoiceComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }


  onHit(){
      this.closebutton.nativeElement.click();
  }
  delete(p){
    console.log(p.id)
    const id = {
      id:p.id
    }
    console.log(p)
  // this.box=this.dialog.open(ConfirmationDialogComponent);
         this.box = this.dialog.open(ConfirmationDialogComponent, {
           disableClose: true
         });
         this.box.componentInstance.confirmMessage = "Are you sure you want to delete ?"
    
         this.box.afterClosed().subscribe(result => {
           console.log(result)
          //  this.spinner.show()
           if(result) {
             // do confirmation actions
             this.orders.delete(id).subscribe(data=>{
               //     console.log("deleted",data);
               this.toast.success("Order Deleted")         
// setTimeout(() => {
//   /** spinner ends after 3 seconds */
//   this.spinner.hide();
// }, 3000);
               this.ngOnInit();
               },error=>{this.toast.error("Order Not Deleted");              
// setTimeout(() => {
//   /** spinner ends after 3 seconds */
//   this.spinner.hide();
// }, 3000);
this.ngOnInit()});
           }
         });  
  }
  // submit(){
    
  // }
  // public confirmMessage:string;
}
