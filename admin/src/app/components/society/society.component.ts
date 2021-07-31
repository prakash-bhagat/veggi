import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SocietyService } from 'src/app/services/society.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.scss']
})
export class SocietyComponent implements OnInit {
@ViewChild('closebuttoninsert') closebuttoninsert
@ViewChild('closebuttonupdate') closebuttonupdate
  datasource;
  update: FormGroup;
  insert: FormGroup;
  constructor(private society:DashboardService,private soc:SocietyService,
    private toast:ToastrService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.update = new FormGroup({
      society_id:new FormControl('',Validators.required),
      society: new FormControl('',Validators.required)
    })
    this.insert = new FormGroup({
      society: new FormControl('',Validators.required),
    })
    this.spinner.show()
    this.society.society().subscribe(data=>{
      this.datasource=data
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      // console.log(data)
    },err=>{setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
  })
  }

  onUpdate(){
  this.closebuttonupdate.nativeElement.click()
    this.spinner.show()
    this.soc.update(this.update.value).subscribe(data=>{
      console.log(data)
      this.toast.success("Society Updated");
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      this.ngOnInit();
    },error=>{this.toast.error("Society not updated")
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
    this.ngOnInit();
  })
   
    this.update.reset()
  }
  onInsert(){
  this.closebuttoninsert.nativeElement.click()
    this.spinner.show()
    this.soc.insert(this.insert.value).subscribe(data=>{
      console.log(data)
      this.toast.success("Society Inserted")
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      this.ngOnInit();
    },error=>{this.toast.error("Society not Inserted");
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
    this.ngOnInit();
  })
    // this.ngOnInit;
    this.insert.reset()
  }

}
