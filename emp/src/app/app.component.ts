import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Plugins,PushNotification,PushNotificationToken,
  PushNotificationActionPerformed, } from '@capacitor/core';
  const {PushNotifications} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee';
  ngOnInit(){
     //app open
     PushNotifications.addListener(
      'pushNotificationReceived',
       (notification: PushNotification) => {
        Swal.fire(notification.title,notification.body)
      }
    );
  }
}
