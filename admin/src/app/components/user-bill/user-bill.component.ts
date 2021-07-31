import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-bill',
  templateUrl: './user-bill.component.html',
  styleUrls: ['./user-bill.component.scss']
})
export class UserBillComponent implements OnInit {
  
  deliveryForm: FormGroup;
 chk;
 box;
 list=[];
 orderId;prod=[];
  constructor(private router: Router,private roo: ActivatedRoute,
    private fb:FormBuilder,private fetch:UserService,private order:OrderService,
    public dialog:MatDialog,private toast:ToastrService,) { }

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      id: ['', Validators.required],
      total: ['', Validators.required],
      // payment: [''],
      quantityOrdered: [''],
      products: [''],
      // employee_notes: [''],
  });
  this.roo.queryParams.subscribe(data=>{
    // this.chk=data['orderId']
    this.orderId=this.roo.snapshot.paramMap.get('orderId');
    // this.chk = this.roo.snapshot.paramMap.get('orderId');
    this.fetch.singleDelivery(this.orderId).subscribe(data=>{
      this.chk=data;
      this.chk.c = false
      this.chk.forEach(element => {
        if (element.packet >999) {
          try{ this.prod.push(element);}
          catch(err){console.log(err)};
          // console.log(this.prod)
        }
      });
      this.deliveryForm.controls['name'].setValue(this.chk[0].name);
      this.deliveryForm.controls['mobile'].setValue(this.chk[0].mobile);
      this.deliveryForm.controls['address'].setValue(this.chk[0].address);
      this.deliveryForm.controls['id'].setValue(this.chk[0].id);
      this.deliveryForm.controls['total'].setValue(this.chk[0].total);
      // console.log(data);
      
    })
    // console.log(data);
    
  })
  }
  onChecked(data:any,event){
    this.box =data;
          if(event.target.checked==true){
            this.list.push(this.box);
            console.log(this.list)
            console.log("true")
      }
      else{ 
      const removeIndex = this.list.findIndex(itm => itm.new===this.box.new);

      if(removeIndex !== -1)
      this.list.splice(removeIndex,1);
      console.log("false")
      console.log(removeIndex)
      console.log(this.list)
      }
  }
  get f() { return this.deliveryForm.controls; }
  delete(p){
 
        // this.dialog.open(ConfirmationDialogComponent);
        // this.box = this.dialog.open(ConfirmationDialogComponent, {
        //   disableClose: false
        // });
        // this.box.componentInstance.confirmMessage = "Are you sure you want to delete ?"
    
        // this.box.afterClosed().subscribe(result => {
        //   console.log(result)
        //   if(result) {
        //     // do confirmation actions
        //     this.order.adminUpdate(p).subscribe(data=>{
        //         console.log(data);
        //         this.ngOnInit();
        //       })
        //     console.log(p.id);
        //     console.log(p)
        //   }
        //   this.box = null;
        //   console.log(this.box)
        //   this.ngOnInit();
        // });
      
    
  }
  onSubmit(){
    console.log(this.list);
//    this.list.forEach(element => {
      // console.log(element.products);
  //    const sn = [element];
      // this.result= element
    //  console.log(sn); 
      // this.result=sn; 
      this.order.adminUpdate(this.list).subscribe(data=>{
          if(data === "ok"){
this.toast.success("Order Updated")
this.router.navigateByUrl('/userorders');

          }else{
            this.toast.error("Order Update Failed")
          }
        })
        
      //})

    // this.order.adminUpdate(this.list).subscribe(data=>{
    //   console.log(data);
    // })
    // this.fetch.empDelivery(this.deliveryForm.value).subscribe(data=>{
    //   if(data){
        // this.router.navigateByUrl('userorders')
    //   }else{
    //     console.log("failed");
        
    //   }    
    // })
  };

}
