import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  url = environment.SERVER_URL;

  constructor(private router: Router,private http:HttpClient) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  notification(data){
   return this.http.post(`${this.url}/admin/offerNotification`,data);
  }
  image(image){
    return this.http.post(`${this.url}/products/offer`,image);
  }
  name(){
    return this.http.get(`${this.url}/admin/imageName`)
  }
  delOffer(id){
    return this.http.post(`${this.url}/admin/delOffer`,id)
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }
}
