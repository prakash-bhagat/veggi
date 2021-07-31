import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
@ViewChild('closebutton') closebutton;
  image;
  name;
  datasource;box;
  apiURL=environment.IMAGE_URL;
  constructor(private carousel:DashboardService,private toast:ToastrService,
    public dialog:MatDialog,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show()
    this.carousel.getCarousel().subscribe(data=>{
      this.datasource=data
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    })
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  photo(){
  this.closebutton.nativeElement.click()
    const formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.addCarousel.get('name').value);
      this.spinner.show()
   this.carousel.carousel(formData).subscribe(data=>{
      // this.datasource=data
      this.toast.success("Image Added");
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);

      this.ngOnInit();
    },error=>{this.toast.error("Image Not Added");
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
    this.ngOnInit()}) 
    // console.log(this.addFruit.value);
    console.log(formData);
this.addCarousel.reset();

  }
  addCarousel = new FormGroup({
    name : new FormControl('',Validators.required),
    image : new FormControl('',Validators.required),
  }) 

  delete(p){
    console.log(p.id)
    const id = {
      id:p.id
    }
    console.log(id)
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
            this.carousel.delCarousel(id).subscribe(data=>{
              //     console.log("deleted",data);
              this.toast.success("Carousel Deleted")
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
              this.ngOnInit();
              },error=>{this.toast.error("Carousel Not Deleted");
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
               this.ngOnInit()});
          }
        });  
  }

}
