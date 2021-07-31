import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NavService } from 'src/app/services/nav.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-offer-image',
  templateUrl: './offer-image.component.html',
  styleUrls: ['./offer-image.component.scss']
})
export class OfferImageComponent implements OnInit {
@ViewChild('closebuttonphotoimage') closebuttonphotoimage;
@ViewChild('closebuttonaddOffer') closebuttonaddOffer;

image;
nameImage;
photoimage : FormGroup;
addOffer: FormGroup;
apiURL=environment.IMAGE_URL;
box;
  constructor(private nav:NavService,private toast:ToastrService,public dialog:MatDialog,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.nav.name().subscribe(data=>{
      this.nameImage=data
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
    });
    this.addOffer=new FormGroup({
      title:new FormControl('',Validators.required),
      body:new FormControl('',Validators.required),
      imageName:new FormControl('',Validators.required)
    })
    this.photoimage = new FormGroup({
    image: new FormControl('',Validators.required),
    })
  }

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
          if(result) {
            // do confirmation actions
            this.nav.delOffer(id).subscribe(data=>{
              //     console.log("deleted",data);
              this.toast.success("Offer Deleted")
              this.ngOnInit();
              },error=>{this.toast.error("Offer Not Deleted"); this.ngOnInit()});
          }
        });  
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  photo(){
  this.closebuttonphotoimage.nativeElement.click()
    const formData = new FormData();
      formData.append('image', this.image);
   this.nav.image(formData).subscribe(data=>{
      // this.datasource=data
      this.toast.success("Image Added");
      this.ngOnInit();
    },error=>{this.toast.error("Image Not Added");this.ngOnInit()}) 
    // console.log(this.addFruit.value);
    console.log(formData);
    this.photoimage.reset()
  }
  
  onSubmit(){
   this.closebuttonaddOffer.nativeElement.click()
this.spinner.show();
      this.nav.notification(this.addOffer.value).subscribe(not=>{
        console.log(not)
        this.toast.success("Offer Placed");
setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      this.ngOnInit();
      },err=>{
        this.toast.error("Offer not placed");
setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      this.ngOnInit();
})
      this.addOffer.reset();
      // this.ngOnInit;
  }

}
