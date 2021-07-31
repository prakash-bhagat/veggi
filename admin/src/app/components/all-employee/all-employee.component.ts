import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.scss']
})
export class AllEmployeeComponent implements OnInit {
  datasource: any;
  box;

  constructor(private emp:EmployeeService,public dialog:MatDialog,private toast:ToastrService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show()

    this.emp.list().subscribe(data=>{
      this.datasource=data;
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

  delete(p){
    console.log(p.mobile)
    const mobile = {
      mobile:p.mobile
    }
    console.log(mobile)
//  this.box=this.dialog.open(ConfirmationDialogComponent);
        this.box = this.dialog.open(ConfirmationDialogComponent, {
          disableClose: false
        });
        this.box.componentInstance.confirmMessage = "Are you sure you want to delete ?"
    
        this.box.afterClosed().subscribe(result => {
          console.log(result)
          // this.spinner.show()
          if(result) {
            // do confirmation actions
            this.emp.delete(mobile).subscribe(data=>{
              //     console.log("deleted",data);
              this.toast.success("Employee Deleted")
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
              this.ngOnInit();
              },error=>{this.toast.error("Employee Not Deleted"); 
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
              this.ngOnInit()});
            // console.log(p.mobile);
            // console.log(p)
          }
          // this.box = null;
          // console.log(this.box)
          // this.ngOnInit();
        });  
        // this.ngOnInit();  
  }

  // onDelete(){
  //   this.emp.delete(this.delete.value).subscribe(data=>{
  //     console.log("deleted",data);
      
      
  //   })
  // }

  // delete = new FormGroup({
  //   mobile: new FormControl,
  // })

}
