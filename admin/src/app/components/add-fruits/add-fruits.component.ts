import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { InventoryService } from '../../services/inventory.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-fruits',
  templateUrl: './add-fruits.component.html',
  styleUrls: ['./add-fruits.component.scss']
})
export class AddFruitsComponent implements OnInit {
  image;
  datasource: any;
  constructor(private inv: InventoryService,private toast:ToastrService,private router:Router,
private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      //this.addFruit.get('image').setValue(this.image)
     // console.log("file",this.addFruit.get('image').value)
    }
  }
onSubmit(){
  const formData = new FormData();
    formData.append('image', this.image);
    formData.append('title', this.addFruit.get('title').value);
    formData.append('price',this.addFruit.get('price').value);
    formData.append('packet', this.addFruit.get('packet').value);
    formData.append('quantity',this.addFruit.get('quantity').value);
    formData.append('type_id',this.addFruit.get('type_id').value);
this.spinner.show()
 this.inv.addFruits(formData).subscribe(data=>{
    // this.datasource=data
    this.toast.success("Fruit Added");
setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();
  }, 3000);
  this.router.navigateByUrl('/inventory')
  },error=>{this.toast.error("Fruit Not Added");
setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();
  }, 3000);
}) 
  // console.log(this.addFruit.value);
  
  // formData.delete(FormData,formData)
  this.addFruit.reset();
  // this.router.navigateByUrl('/inventory')
  

}
addFruit = new FormGroup({
  title : new FormControl('',Validators.required),
  image : new FormControl('',Validators.required),
  price: new FormControl('',Validators.required),
  packet : new FormControl(''),
  quantity: new FormControl('',Validators.required),
  type_id: new FormControl('',Validators.required),
}) 
}
