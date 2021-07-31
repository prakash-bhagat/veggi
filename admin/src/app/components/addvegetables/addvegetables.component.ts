import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-addvegetables',
  templateUrl: './addvegetables.component.html',
  styleUrls: ['./addvegetables.component.scss']
})
export class AddvegetablesComponent implements OnInit {
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
    formData.append('title', this.addVegetable.get('title').value);
    formData.append('price',this.addVegetable.get('price').value);
    formData.append('packet', this.addVegetable.get('packet').value);
    formData.append('quantity',this.addVegetable.get('quantity').value);
    formData.append('type_id',this.addVegetable.get('type_id').value);
this.spinner.show()
 this.inv.addVegetables(formData).subscribe(data=>{
    // this.datasource=data
    this.toast.success("Vegetables Added");
setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();
  }, 3000);
    this.router.navigateByUrl('/inventory')   
  },error=>{this.toast.error("Vegetables Not Added");
setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();
  }, 3000);
}) 
    // console.log(this.addVegetable.value);
    // formData.reset()
    this.addVegetable.reset();
    // this.router.navigateByUrl('/inventory')
  }
  addVegetable = new FormGroup({
    title : new FormControl('',Validators.required),
    image : new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    packet : new FormControl(''),
    quantity: new FormControl('',Validators.required),
    type_id: new FormControl('',Validators.required),
  })
}
