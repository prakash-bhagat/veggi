import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { UserOrdersService } from '../../services/user-orders.service';
import {elementAt, map} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  test: any;
  chk: any;
  success:boolean = false;
  orderId;
  deliveryForm: FormGroup;
  item;arrayData;
  qnty;list:any=[];result=[];
  checkbox:boolean=false;
  checked:boolean= false;
  sum;dataloop;prod=[];

  constructor(private fetch: DeliveryService, private router: Router,
    private roo: ActivatedRoute,private fb:FormBuilder,
    private spinner:NgxSpinnerService,private toast:ToastrService) { }

  ngOnInit(): void {
  // console.log(this.list)
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      id: ['', Validators.required],
      // total: ['', Validators.required],
      payment: ['Cash',Validators.required],
      employee_notes: [''],
  });
    this.roo.queryParams.subscribe(data=>{
      this.orderId=this.roo.snapshot.paramMap.get('orderId');
      this.fetch.singleDelivery(this.orderId).subscribe(data=>{
        this.chk=data;
		// console.log("locAL",data)
        this.chk.c = false
        this.chk.forEach(element => {
          if (element.packet >999) {
            try{ this.prod.push(element);}
            catch(err){console.log(err)}
            // console.log(this.prod)
          }
        });
        // console.log(data)
        this.deliveryForm.controls['name'].setValue(this.chk[0].name);
        this.deliveryForm.controls['mobile'].setValue(this.chk[0].mobile);
        this.deliveryForm.controls['address'].setValue(this.chk[0].address);
        this.deliveryForm.controls['id'].setValue(this.chk[0].id);
        // this.deliveryForm.controls['total'].setValue(this.chk[0].total);
        // this.deliveryForm.controls['payment'].setValue('payment');
      //  this.deliveryForm.controls['employee_notes'].setValue(this.chk[0].employee_notes);
        // console.log("data",data);
      })
      // console.log(this.orderId);
    })
   }
   get f() { return this.deliveryForm.controls; }

   
onChecked(data:any,event){
  // console.log(event.target.checked);
  this.item =data;

              if(event.target.checked===true){
                this.list.push(this.item);
                console.log(this.list)
				//for each
                this.dataloop=this.list;
      let total = 0
    this.dataloop.forEach(element => {
      total += element.quantityOrdered * element.price;
    });  
    // console.log(total)
    this.sum = total  
    //for each end
          }
          else{
			  // console.log(this.list)
			  // this.removeByAttr(this.list, 'id', data.single); 
			  
         this.list.find(itm => {
           if(itm.single==data.single){
              
            //  console.log(data)
             const removeIndex = this.list.findIndex(itm => itm.single===data.single);

             if(removeIndex !== -1)
             this.list.splice(removeIndex,1);
             let total = 0
    this.dataloop.forEach(element => {
      total += element.quantityOrdered * element.price;
    });  
    // console.log(total)
    this.sum = total  
    console.log(this.list.length);
  }
        }); 
        }

}

onSubmit(){
//this.spinner.show();
    let test ={
      payment:this.deliveryForm.get('payment').value,
      employee_notes:this.deliveryForm.get('employee_notes').value,
    }
    // this.list.test= test;
    this.list.forEach(element => {
      element.test = test;
      // console.log(this.list)
    });
	// console.log(this.list)
    // this.list.push(test)
    console.log(test);
    console.log(this.list)
   this.fetch.empDelivery(this.list).subscribe(data=>{
     if(data){
     setTimeout(() => {
       this.spinner.hide();
     }, 1000);
         this.toast.success("Delivered")  
     }else{
     setTimeout(() => {
       this.spinner.hide();
     }, 1000);
     this.toast.error("Not delivered")
     }
   },err=>{this.toast.error("Not delivered")})
this.router.navigateByUrl('/employee/dashboard',{replaceUrl:true});
}
return(){

let notdelivered ={
employee_notes:this.deliveryForm.get('employee_notes').value,
}
this.chk.forEach(element=>{
  element.notdelivered = notdelivered
})
console.log("list",this.chk)
this.fetch.return(this.chk).subscribe(data=>{
  if(data){
    this.toast.success("Item returned")
  }else{
    this.toast.error("Item not returned")
  }
},err=>{
  this.toast.error("server error")
})
this.router.navigateByUrl('/employee/dashboard',{replaceUrl:true});
}

back(){
  this.router.navigateByUrl('employee/dashboard',{skipLocationChange:true});
}

}
