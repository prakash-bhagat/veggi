import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

constructor(public navService: NavService, private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem("auth")
    this.router.navigateByUrl('/')
  }
}
