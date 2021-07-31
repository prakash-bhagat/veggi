import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
// login;
message
  constructor(private toast:ToastrService,private messagingService: NotificationService,
    private router:Router) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem("auth"))
    if(data){
      this.router.navigateByUrl('/dashboard');
      // console.log(data);
    }else{
      this.router.navigateByUrl('/');
    }
  }
  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  onSubmit(){
    if(this.login.get('email').value==="pranjalujlakalki@gmail.com"){
      if(this.login.get('password').value==="Pranjal123"){
       let data = JSON.stringify(this.login.value)
        localStorage.setItem("auth",data)
    // console.log("admin",this.login.value)
    this.toast.success("Logged In")
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    this.router.navigateByUrl('/dashboard')
  }else{
    this.toast.error("Password not match")
  }
  }else{
    this.toast.error("Invalid email")
  }
  }

}
