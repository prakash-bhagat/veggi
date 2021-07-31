import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserOrdersService } from 'src/app/services/user-orders.service';
import { LoginService } from './../../services/login.service';
import { Plugins,PushNotification,PushNotificationToken,
  PushNotificationActionPerformed, } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { not } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

  const {PushNotifications} = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  message;fcmSendToken;inapptoken;
  success: boolean=false;
  SERVER_URL = environment.SERVER_URL
  constructor(private router:Router, private log:LoginService,private http: HttpClient,
              private toast:ToastrService, private userorder: UserOrdersService, ) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem("auth"))
    if(data){
      this.router.navigateByUrl('/employee/dashboard');
      // console.log(data);
    }else{
      this.router.navigateByUrl('/');
    }
  }
  onLogin(){
    this.log.login(this.login.value).subscribe(data=>{
      // console.log(data);
      if(data){
        // this.userorder.usersorders(data[0].id).subscribe(info=>{
          // console.log("info");
          localStorage.setItem("auth",JSON.stringify(data))
          this.toast.success("Success",'');
          this.router.navigateByUrl('employee/dashboard');
          PushNotifications.register();
          // app close
                    PushNotifications.addListener(
                      'registration',
                      async (token: PushNotificationToken) => {
                        this.fcmSendToken = token.value;
                        console.log("fcmsenttoken",this.fcmSendToken);
          let usertoken ={
            mobile:this.login.get('mobile').value,
            token:this.fcmSendToken
          }
          this.http.post(`${this.SERVER_URL}/employee/getToken`,usertoken).subscribe(data=>{
            console.log(data)
          }, err => {
            console.log('error',err);
          });
                      }
                    );
                    //app open
                    PushNotifications.addListener(
                      'pushNotificationReceived',
                       (notification: PushNotification) => {
                        Swal.fire(notification.title,notification.body)
                        //  console.log("noti",notification)
                        //  swal.fire(`notification.body`)
                        // alert(JSON.stringify(notification.body))
                        
                         //this.toast.info('Order',notification.body,{
                           //timeOut:10000,
                          // positionClass:'toast-top-center'
                         //})
                      }
                    );
                    
        // })
      }else{
        // console.log("failed")
        this.toast.error("Failed",'') 
      }     
    })
  }
  // status(){
  //   this.toast.success('Success','',{
  //     timeOut: 2000,
  //     positionClass: 'toast-top-center',
      
  //   })
  // };
  
login = new FormGroup({
  mobile : new FormControl('', [Validators.required]),
  password : new FormControl('', [Validators.required]),
})
getErrorMessage() {
  // if (this.mobile.hasError('required')) {
  //   return 'You must enter a value';
  // }
};
errorPassword(){
  // if(this.password.hasError('required')){
  //   return 'You must enter a password'
  // }
};
}

