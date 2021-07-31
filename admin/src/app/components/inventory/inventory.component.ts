import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
@ViewChild('closebuttonin', {static: true}) closebuttonin;
 @ViewChild('closebuttonout', {static: true}) closebuttonout;
 @ViewChild('closebuttonupdate',{static:true}) closebuttonupdate;
 @ViewChild('closebuttonoffer',{static:true}) closebuttonoffer;
 
  datasource:any;
  p: number = 1;
  products;
  box;prod=[];
  isVisible:boolean=true;
  image = environment.IMAGE_URL;
  show: boolean;

  constructor(private product:ProductsService,private inventory:InventoryService,
    public dialog:MatDialog,private toast:ToastrService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
	this.show= true
    this.spinner.show()
    this.product.inventory().subscribe((data:any)=>{
      this.datasource = data.products;
     //console.log(this.datasource);
      this.datasource.forEach(element => {
        if (element.packet >999) {
          try{ this.prod.push(element);}
            catch(err){console.log(err)};
        }
      });
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
    // console.log(p.id)
    const id = {
      id:p.id
    }
    // console.log(id)
//  this.box=this.dialog.open(ConfirmationDialogComponent);
        this.box = this.dialog.open(ConfirmationDialogComponent, {
          disableClose: true
        });
        this.box.componentInstance.confirmMessage = "Are you sure you want to delete ?"
    
        this.box.afterClosed().subscribe(result => {
          // console.log(result)
          // this.spinner.show()
          if(result) {
            // do confirmation actions
            this.product.delete(id).subscribe(data=>{
              //     console.log("deleted",data);
              this.toast.success("Product Deleted")
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
              this.ngOnInit();
              },error=>{this.toast.error("Product Not Deleted"); 
              // setTimeout(() => {
              //   /** spinner ends after 3 seconds */
              //   this.spinner.hide();
              // }, 3000);
              this.ngOnInit()});
          }
        });  
  }
  // onDelete(){
  //   this.product.delete(this.delete.value).subscribe(data=>{
  //     console.log(data);
      
  //   })
  // }


  onUpdate(){
    // console.log(this.update.value);
    // this.spinner.show()
    this.closebuttonupdate.nativeElement.click()
    this.inventory.updateInventory(this.update.value).subscribe(data=>{
      if(data){
        this.toast.success("Price and Quantity Updated");
        // setTimeout(() => {
        //   /** spinner ends after 3 seconds */
        //   this.spinner.hide();
        // }, 3000);
        this.ngOnInit();
      }else{this.toast.error("Price and Quantity Not Updated");
      // setTimeout(() => {
      //   /** spinner ends after 3 seconds */
      //   this.spinner.hide();
      // }, 3000);
    }
    },error=>{this.toast.error("Unable to connect to serve")
    // setTimeout(() => {
    //   /** spinner ends after 3 seconds */
    //   this.spinner.hide();
    // }, 3000);
  })
    // this.ngOnInit();
    this.update.reset()
  }
update= new FormGroup({
  id: new FormControl('',Validators.required),
  price: new FormControl('',Validators.required),
  quantity: new FormControl('',Validators.required),
})
onOfferUpdate(){
  this.closebuttonoffer.nativeElement.click()
    // console.log(this.update.value);
// this.spinner.show()
    this.product.updateOffer(this.offerUpdate.value).subscribe(data=>{
      if(data){
        this.toast.success("Offer Price Updated");
        this.ngOnInit();
      }else{this.toast.error("Offer Not Updated")
    }
    },error=>{this.toast.error("Unable to connect to server")
  })
    // this.ngOnInit();
    this.offerUpdate.reset()
  
}
offerUpdate= new FormGroup({
  id: new FormControl('',Validators.required),
  offerPrice: new FormControl('',Validators.required),
  price: new FormControl(Validators.required),
})
inStock(){
  //console.log(this.instock.value);
    // console.log(this.update.value);
// this.spinner.show()
this.closebuttonin.nativeElement.click()
    this.product.instock(this.instock.value).subscribe(data=>{
      if(data){
        this.toast.success("Stock Updated");
        // setTimeout(() => {
        //   /** spinner ends after 3 seconds */
        //   this.spinner.hide();
        // }, 3000);
        this.ngOnInit();
      }else{this.toast.error("Stock Not Updated")
      // setTimeout(() => {
      //   /** spinner ends after 3 seconds */
      //   this.spinner.hide();
      // }, 3000);
    }
    },error=>{this.toast.error("Unable to connect to server")
    // setTimeout(() => {
    //   /** spinner ends after 3 seconds */
    //   this.spinner.hide();
    // }, 3000);
  })
    // this.ngOnInit();
    this.instock.reset()
  
}
instock= new FormGroup({
  id: new FormControl('',Validators.required),
})
outStock(){
this.closebuttonout.nativeElement.click();
  //console.log(this.closemodal);
    this.product.outstock(this.outstock.value).subscribe(data=>{
      if(data){
        this.toast.success("Stock Updated");
        this.show = false
        //this.isVisible=false
        this.ngOnInit();
      }else{this.toast.error("Stock Not Updated")
    }
    },error=>{this.toast.error("Unable to connect to server")
    
  })
    this.outstock.reset()
}

outstock= new FormGroup({
  id: new FormControl('',Validators.required),
})
test(){
  //this.isVisible=false
}

}
