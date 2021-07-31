import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-add-dairy',
  templateUrl: './add-dairy.component.html',
  styleUrls: ['./add-dairy.component.scss']
})
export class AddDairyComponent implements OnInit {
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
    }
  }
onSubmit(){
  const formData = new FormData();
    formData.append('image', this.image);
    formData.append('title', this.addDairy.get('title').value);
    formData.append('price',this.addDairy.get('price').value);
    formData.append('packet', this.addDairy.get('packet').value);
    formData.append('quantity',this.addDairy.get('quantity').value);
    formData.append('type_id',this.addDairy.get('type_id').value);
    this.spinner.show()
 this.inv.addDairy(formData).subscribe(data=>{
    // this.datasource=data
    this.toast.success("Dairy Added");
    setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    this.router.navigateByUrl('/inventory')
  },error=>{this.toast.error("Dairy Not Added");
  setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();
  }, 3000);
}) 
  // console.log(this.addFruit.value);
  // console.log(formData);
  this.addDairy.reset();
  

}
addDairy = new FormGroup({
  title : new FormControl('',Validators.required),
  image : new FormControl('',Validators.required),
  price: new FormControl('',Validators.required),
  packet : new FormControl('',Validators.required),
  quantity: new FormControl('',Validators.required),
  type_id: new FormControl('',Validators.required),
}) 
}
