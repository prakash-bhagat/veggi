import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmailValidator]
})
export class RegisterComponent implements OnInit {
  hide = true;
  registrationForm: FormGroup;
  society_name;
  chkselct:boolean = false;
  private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  comparePassword: boolean;
  registrationMessage: string;
  test: Promise<boolean>;

  constructor(private fb: FormBuilder,
              private checkEmailService: CheckEmailService,
              private router:Router,
              private userService: UserService,private toast: ToastrService) {

    this.registrationForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.minLength(10),Validators.maxLength(10)]],
      address: ['',[Validators.required]],
      society : ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }


  ngOnInit(): void {
    this.userService.society().subscribe((society:any)=>{
      this.society_name=society;
    })
    this.registrationForm.valueChanges
      .pipe(map((controls) => {
        return this.formControls.confirmPassword.value === this.formControls.password.value;
      }))
      .subscribe(passwordState => {
        this.comparePassword = passwordState;
      });
  }

  registerUser() {
  let m ={
  mobile:this.registrationForm.get('mobile').value
  }
this.userService.getnumber(m).subscribe(data=>{
let mob = data[0].mobile;

  if(mob != 1){
  
    this.userService.registerUser({
      ...this.registrationForm.value})
      .subscribe((response: { message: string }) => {
      if(response)
      {this.registrationMessage = response.message;
      this.toast.success("Success")
    }else{
      this.toast.error("Error")
    }
    });
    this.registrationForm.reset();
    this.router.navigate(['/default']);

  }else{
  this.toast.error("Mobile number exist")
  }
})

  }
}
