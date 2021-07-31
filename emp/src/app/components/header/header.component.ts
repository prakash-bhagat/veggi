import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOrdersService } from 'src/app/services/user-orders.service';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
text;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('auth');
    // console.log(localStorage.clear())
    this.router.navigateByUrl('/');
  }

}
