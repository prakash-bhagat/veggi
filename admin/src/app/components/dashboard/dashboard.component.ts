import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from '../../services/push-notification.service'
  // const {PushNotifications} = Plugins;
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const config = {
  //   apiKey: "AIzaSyCIgF0p5HldPhaakG_rluiaj0ZTanRQaSk",
  //   authDomain: "homease-5858.firebaseapp.com",
  //   databaseURL: "https://homease-5858.firebaseio.com",
  //   projectId: "homease-5858",
  //   storageBucket: "homease-5858.appspot.com",
  //   messagingSenderId: "364586467493",
  //   appId: "1:364586467493:web:d93c98be8c7599439f0d4c",
  //   measurementId: "G-20XRCGWCKG"
  // };
// firebase.initializeApp(config);
  const VAPID_PUBLIC = "BL_viucwQ9PpuavYjTNdOHN-gN98H_qfveuY7KUjyqFq1hjtR0-es1Dz9gTgvbl0dP6-mXI3AnDT67kLczwSkbY";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datasource: any;
  id:any;
  emp:any;

 

  
  constructor(swPush:SwPush,private sell:DashboardService,private spinner: NgxSpinnerService,
    private toast:ToastrService,pushService: PushNotificationService) {
      if(swPush.isEnabled){
        swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error)
        console.log("push")
      }else{
        console.log("not pushed")
      }
     }

  ngOnInit(): void {
    this.spinner.show();
   let subscription = this.sell.dailyOrders().subscribe(data=>{
      this.datasource=data;
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      //console.log(data);
    },dataError=>{
      // this.toast.error("Error Fetching Data")
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    });

    this.sell.totalusers().subscribe(id=>{
      this.id=id;
    });
    this.sell.totalemployee().subscribe(emp=>{
      // this.toast.success("Error Fetching Data")
      this.emp=emp;
    })
//notification

//end
    
  }

}
