import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '@app/services/address.service';
import { UserService } from '@app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {

  message;
userId: number;
  myUser: any;

  constructor( private addressService:AddressService,private user: UserService,private toast:ToastrService) { }

  addressChange= new FormGroup({
    address: new FormControl('',Validators.required)

  })

  onSubmit(){
    const data = {
      userId:this.myUser.id,
      address: this.addressChange.controls['address'].value
    }
    this.addressService.addUpdate(data).subscribe((data:any)=>{
      if(data){
        this.toast.success("Address updated")
        this.user.logout();
        this.toast.success("Re-login")
      }else{
        this.toast.error("Address Not Updated")
      }
    })
  }

  ngOnInit(): void {
    this.myUser = JSON.parse(localStorage.getItem('access_token'));  
  }
}
