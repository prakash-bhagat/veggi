import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OldPwdValidators } from './../../validators/pwd.validators';
import { PwdService } from '@app/services/pwd.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form1: FormGroup; 
  success:any;
  myUser: any;
  
  constructor(private fb: FormBuilder, 
    private pwdService:PwdService,private toast:ToastrService,
    public userService: UserService){
    this.form1 = fb.group({
      // 'oldPwd': ['',Validators.required,OldPwdValidators.shouldBe1234],
      'newPwd': ['',[Validators.required,Validators.minLength(6)]],
      'confirmPwd': ['',[Validators.required,Validators.minLength(6)]]
    }, {
      validators: OldPwdValidators.matchPwds
    });
  }

  // get oldPwd(){
  //   return this.form1.get('oldPwd');
  // }

   get newPwd(){
    return this.form1.get('newPwd');
  }

   get confirmPwd(){
    return this.form1.get('confirmPwd');
  }

pwdChange(){
  const data = {
    userId:this.myUser.id,
    address: this.form1.controls['newPwd'].value
  }
  this.pwdService.pwdUpdate(data).subscribe((data:any)=>{
    if(data){
      this.toast.success("Password Updated relogin")
      this.userService.logout();
    }else{
      this.toast.error("Error")
    }
  },err=>{this.toast.error("Server Error")}) 
 // console.log("data",data)   

  // this.success="Password Change!!!!";
}
  ngOnInit(): void {
    this.myUser = JSON.parse(localStorage.getItem('access_token'));
   // console.log(this.myUser.id)
    
  }

  
}
