import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

 
  // for storing the returned subscription

  constructor () { }

  ngOnInit(): void {  }
  // ngAfterViewInit() {
  //   this.backButtonSubscription = this.platform.backButton.subscribe(() => {
  //     navigator['app'].exitApp();
  //   });
  // }
  // ngOnDestroy() {
  //   this.backButtonSubscription.unsubscribe();
  //  }

}
