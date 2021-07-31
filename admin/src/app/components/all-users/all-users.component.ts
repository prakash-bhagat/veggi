import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})


export class AllUsersComponent implements OnInit {
  datasource:any;
  p:number=1;
  box;
  // displayedColumns: string[] = ['name', 'mobile', 'address','id'];
  // dataSource = new MatTableDataSource([this.users.allUsers()]);
  constructor(private users:UserService,public dialog:MatDialog,private toast:ToastrService,
    private spinner: NgxSpinnerService,) { }


  ngOnInit(): void {
    this.spinner.show()
    this.users.allUsers().subscribe(data=>{
      this.datasource = data;
      console.log(data);
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
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
            this.users.delusers(mobile).subscribe(data=>{
              //     console.log("deleted",data);
              this.toast.success("User Deleted");
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
              this.ngOnInit();
              },error=>{this.toast.error("User Not Deleted");
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
               this.ngOnInit()});
          }
        });  
  }


  // onDelete(){
  //   this.users.delusers(this.delete.value).subscribe(data=>{
  //     console.log("deleted",data);
      
      
  //   })
  // }

  // delete = new FormGroup({
  //   mobile: new FormControl,
  // })

}
