import {Injectable} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { tokenName } from '@angular/compiler';
import Swal from 'sweetalert2';
import { Plugins,PushNotification,PushNotificationToken,
  PushNotificationActionPerformed, } from '@capacitor/core';

  const {PushNotifications} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;
  fcmSendToken;

  constructor(private httpClient: HttpClient,private toast:ToastrService,
              private DataService: DataService)
  {
          // console.log(this.auth);
          const token =  localStorage.getItem('access_token')
          if(token){
          const  loginStatus ={
          isLoggedIn:true
            }
            this.DataService.changeMessage(loginStatus)
            // console.log(token)
           }
  }

  //  Login User with mobile and Password
  loginUser(mobile: string, password: string) {

    this.httpClient.post(`${this.SERVER_URL}/auth/login`, {mobile, password})
      .pipe(catchError((err: HttpErrorResponse) => of(console.log("Invalid credentials"))))
      .subscribe((data: ResponseModel) => {
if(data.auth === true){
          this.fcmSendToken = '';
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(data.auth);
          this.userData$.next(data);
          const  loginStatus ={
            isLoggedIn:true
          }
          this.toast.success("Logged In")
          localStorage.setItem('access_token', JSON.stringify(data))
          this.DataService.changeMessage(loginStatus);
          // notification(){
            PushNotifications.register();
          
                    PushNotifications.addListener(
                      "registration",
                      async (token: PushNotificationToken) => {
                        this.fcmSendToken = token.value;
                        // console.log("fcmsenttoken",this.fcmSendToken);
          let usertoken ={
            mobile:mobile,
            token:this.fcmSendToken
          }
          this.httpClient.post(`${this.SERVER_URL}/auth/getToken`,usertoken).subscribe(data=>{
          //  console.log(data)
          }, err => {
          //  console.log('error',err);
          });
                      }
                    );
					//app open
                    PushNotifications.addListener(
                      'pushNotificationReceived',
                       (notification: PushNotification) => {
                        // console.log("noti",notification)
                        Swal.fire(notification.title,notification.body)
                        //  this.toast.info('Order',notification.body,{
                        //    timeOut:10000,
                        //    positionClass:'toast-top-center'
                        //  })
                      }
                    );
      }else{
        this.loginMessage$.next("Invalid credentials");
      }
      });
  }

getToken() {
     return localStorage.getItem('access_token');
    //  localStorage.getItem('info');
  }
get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    const  loginStatus ={
      isLoggedIn:false
    }
    this.DataService.changeMessage(loginStatus);
    return localStorage.removeItem('access_token');
}

disposeToken(mobile){
  return this.httpClient.post(`${this.SERVER_URL}/users/disposetoken`,mobile);
}

getnumber(mobile){
    return this.httpClient.post(`${this.SERVER_URL}/auth/getnumber`,mobile);
  }

  registerUser(formData: any, typeOfUser?: string): Observable<{ message: string }> {
    const {name, mobile, address, password,society} = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {
      mobile,
      name,
      address,
      typeOfUser,
      password,
      society,
    });
  }
  society(){
    return this.httpClient.get(`${this.SERVER_URL}/users/society`);
  }

}


export interface ResponseModel {
  token: string;
  auth: boolean;
  mobile: number;
  name: string;
  address:string;
  userId: number;
  type: string;
  role: number;
  fcmSendToken;
}
