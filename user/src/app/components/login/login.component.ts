import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import { UserinfoService } from '@app/services/userinfo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  mobile: string;
  password: string;
  name:string;
  address:string;
  loginMessage: string;
  userRole: number;
  loading= false;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private userInfo:UserinfoService,
              private route: ActivatedRoute,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  login(form: NgForm) {
    const mobile = this.mobile;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    // form.reset();
    this.userService.loginUser(mobile, password);

    this.userService.loginMessage$.subscribe(msg => {
      this.loginMessage = msg;
      setTimeout(() => {
        this.loginMessage = '';
      }, 2000);
    });


  }
}
