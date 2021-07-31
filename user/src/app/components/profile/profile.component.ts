import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { AddressService } from '@app/services/address.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;
  userId:any;
  mobile:any;
  name:any;
  address:any;


  constructor(private authService: AuthService,
              private userService: UserService,
              private info:AddressService,
              private router: Router) {
  }

  ngOnInit(): void {
     
        this.myUser = JSON.parse(localStorage.getItem('access_token'));
        this.userService.auth
  }

  logout() {
    this.userService.logout();
  }
}
