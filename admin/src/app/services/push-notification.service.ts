import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
const SERVER_URL = environment.SERVER_URL
@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
 
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription)
  }
}
